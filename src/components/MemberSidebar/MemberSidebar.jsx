import { useState, useEffect } from 'react';
import { onValue, update, remove, get, child } from 'firebase/database';
import { membersRef, assignmentsRef } from '../../firebase/config';
import { formatCategory } from '../../utils/format';
import { useAlert } from "../../utils/useAlert";

export function MemberSidebar({ isOpen, selectedMember, setSelectedMember, onReset }) {
    const [members, setMembers] = useState([]);
    const [taskCounts, setTaskCounts] = useState({});
    const [selectedRole, setSelectedRole] = useState('all');
    const [message, type, showAlert] = useAlert();

    useEffect(() => {
        onValue(membersRef, (snapshot) => {
            const data = snapshot.val();
            if (!data) return setMembers([]);
            const array = Object.entries(data).map(([id, obj]) => ({ id, ...obj }));
            setMembers(array);
        });
    }, []);

    useEffect(() => {
        onValue(assignmentsRef, (snapshot) => {
            const data = snapshot.val();
            if (!data) return setTaskCounts({});

            const counts = {};
            for (const task of Object.values(data)) {
                if (task.status === "in-progress" && task.member) {
                    counts[task.member] = (counts[task.member] || 0) + 1;
                }
            }
            setTaskCounts(counts);
        });
    }, []);

    async function handleDeleteMember(memberId) {
        const member = members.find((m) => m.id === memberId);
        if (!member) return;

        const memberRef = child(membersRef, memberId);
        await remove(memberRef);
        showAlert(`${member.name} har tagits bort`, "error");

        const snapshot = await get(assignmentsRef);
        const tasks = snapshot.val();
        if (!tasks) return;

        Object.entries(tasks).forEach(([taskId, task]) => {
            if (task.member === memberId) {
                const taskRef = child(assignmentsRef, taskId);
                update(taskRef, {
                    status: "new",
                    member: ""
                });
            }
        });

        if (selectedMember === memberId) {
            setSelectedMember("all");
        }
    }

    if (!isOpen) return null;

    const filtered = selectedRole === 'all'
        ? members
        : members.filter((m) => m.category === selectedRole);

    return (
        <aside className="member-sidebar">
            <div className="member-header">
                <h2>Team Members</h2>
                <div className="member-roles">
                    {['all', 'ux', 'frontend', 'backend'].map((role) => {
                        const count =
                            role === 'all'
                                ? members.length
                                : members.filter((m) => m.category === role).length;

                        const label =
                            role === 'all'
                                ? `Alla (${count})`
                                : `${role.charAt(0).toUpperCase() + role.slice(1)} (${count})`;

                        return (
                            <button
                                key={role}
                                className={selectedRole === role ? 'active' : ''}
                                onClick={() => setSelectedRole(role)}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="member-list-scroll">
                <ul className="member-list">


                    {filtered.map((member) => (
                        <li key={member.id} className="member-item">
                            <div
                                className="member-wrapper"
                                onClick={() => setSelectedMember(member.id)}
                                title={`${member.name} (${formatCategory(member.category)})`}
                            >
                                <span
                                    className={
                                        selectedMember === member.id ? 'active member-name' : 'member-name'
                                    }
                                >
                                    {member.name} ({formatCategory(member.category)})
                                    {taskCounts[member.id] ? ` (${taskCounts[member.id]})` : ""}
                                </span>

                                <span
                                    className="member-delete"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteMember(member.id);
                                    }}
                                    title="Ta bort medarbetare"
                                >
                                    🗑️
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="member-reset">
                <button onClick={onReset}>
                    Återställ
                </button>
            </div>
            {message && <div className={`toast ${type}`}>{message}</div>}
        </aside>

    );
}