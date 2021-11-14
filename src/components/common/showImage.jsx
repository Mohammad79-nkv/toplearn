import React from 'react';
import { Img } from 'react-image';
import SquareLoader from 'react-spinners/ScaleLoader'

const ShowImage = ({image}) => {
    return ( 
        <Img src = {[`https://toplearnapi.ghorbany.dev/${image}`, "http://via.placeholder.com/150x100"]}
        loader = {
            <div className = "text-center mx-auto">
                <SquareLoader loading = {true} color = {"#4A90E2"}/>
            </div>
        }
        />
     );
}
 
export default ShowImage;