import { Fragment } from "react";
const items = ["Funchal", "Santa Cruz", "Câmara de Lobos", "Ribeira Brava"];
function ListGroup() {
return (
<Fragment>
<h1>List</h1>
<ul className="list-group">
{items.map((item) => (
<li key={item}>{item}</li>
))}
</ul>
</Fragment>
);
}
export default ListGroup;