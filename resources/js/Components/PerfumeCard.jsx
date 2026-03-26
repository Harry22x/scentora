
import './PerfumeCardcss.css'
import NavLink from "./NavLink"

export default function PerfumeCard({perfume}){



    return(
        <>
        <NavLink href={`perfumes/${perfume.id}`}>
        <div >
      <div >
        <div  />
        <img className="image" alt="Mask group" src={`/storage/${perfume.imageUrl}`} />
        <div className="name">{perfume.name}</div>

        <div className="price">{perfume.price}</div>

        

        <div ></div>
    <div className="description">{perfume.description}</div>
    
      </div>
      <div className="label">{perfume.category}</div>
    </div>
    </NavLink>
        </>

    )
}