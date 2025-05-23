export function TaskFilter({ setFilter, setSort }) {

    return (
        <div>
            <label htmlFor="filter">Filtrera: </label>
            <select name="" id="filter" onChange={event => setFilter(event.target.value)}>
                <option value="all">Alla</option>
                <option value="done">Avslutade</option>
                <option value="notDone">Pågående</option>
            </select>

            <label htmlFor="sort">Sortera på: </label>
            <select name="" id="sort" onChange={event => setSort(event.target.value)}>
                <option value="default">Default</option>
                <option value="des">A-Z</option>
                <option value="asc">Z-A</option>
            </select>
        </div>
    )
}