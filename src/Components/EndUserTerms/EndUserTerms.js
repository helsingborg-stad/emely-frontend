import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap'
import textfile from '../../Assets/text-files/user-terms.txt'
import parse from 'html-react-parser';

export default function EndUserTerms() {
const [text, setText] = useState('');

        fetch(textfile)
        .then((response) => response.text())
        .then((myText)  => {
          setText(myText);
        })  
    
	return (
		<>
			<Container className="w-100">
				<p>
					{parse(text)}
				</p>
			</Container>
		</>
	);
}
