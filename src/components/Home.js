import React from 'react';
import { Button } from 'react-bootstrap';
import { AiOutlineUser } from 'react-icons/ai';
import { RiLoginCircleLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import emely from './emely.png';

export default function Home() {
	return (
		<>
			<div className="mt-3 mb-4 text-center" id="container-home">
				<img id="emely-image" className="items-align-center" src={emely} alt="" />
				<h1 className="mt-5 text-center fw-bold">Emely</h1>
                <hr/>
				<h3 className="mt-1 text-center fw-normal">
					Samtalsförande språkrobot
				</h3>
				<Button variant="outline-success" className="w-100 mt-5 rounded-pill p-3 fw-bold">
					<AiOutlineUser size={30} /> BÖRJA SOM GÄST
				</Button>

                <Link to="/login">
                <Button variant="success" className="w-100 mt-3 rounded-pill p-3 fw-bold">
                <RiLoginCircleLine size={30} /> LOGGA IN
            </Button>
            </Link>
			</div>
		</>
	);
}
