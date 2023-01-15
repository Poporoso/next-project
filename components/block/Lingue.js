import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';

const Lingue = ({ data }) => {

	const lingueList = data
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const toggle = () => setDropdownOpen((prevState) => !prevState);

	// Recupero la lingua
	const lang = useSelector(store => store.infoSlice.lang)

	return (
		<>
			<Dropdown isOpen={dropdownOpen} toggle={toggle}>
				<DropdownToggle caret color="light">
					{lang}
				</DropdownToggle>
				<DropdownMenu end={true}>
					{
						lingueList && lingueList.map((item) => {
							return (
								<DropdownItem key={item.id_lingua} onClick={function noRefCheck() { }}>
									<Link to={`${item.abbreviazione_lingua}/`}>{item.nome_lingua}</Link>
								</DropdownItem>
							)
						})
					}
				</DropdownMenu>
			</Dropdown>
		</>
	)
}

export default Lingue