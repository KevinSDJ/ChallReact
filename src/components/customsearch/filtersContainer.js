import React from 'react';
import {Stack} from 'react-bootstrap';




export default function FiltersConteiner(){
	return (<>
		<Stack gap={3}>
		  <div className="bg-light border">
		    First item
		  <ol>
		      <li>option1</li>
		      <li>option2</li>
		      <li>option3</li>
		    </ol>
		  </div>
		  <div className="bg-light border">Second item</div>
		  <div className="bg-light border">Third item</div>
		</Stack>
		</>)
} 