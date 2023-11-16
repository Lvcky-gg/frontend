import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar(){
    const [url, setUrl] = useState("");
    const navigate = useNavigate();

    const handelSearch = e =>{
        e.preventDefault()
        if(url != ""){
            navigate(`/packages${url}`)
        }else{
            navigate("/packages")
        }
    }
    return (<>
    </>)
}