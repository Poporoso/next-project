import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from 'reactstrap'
import {
	eliminaTariffaSelezionata,
	eliminaTipoSelezionato
} from '../../store/dataBookingSlice'

const BookingFormRoom = ({ info, gestioneOccupazione }) => {

	const { ospiti, nomeTariffa, nomeTipologia, tariffa, tipo } = info

	const inputRef = useRef([])
	const selectRef = useRef([])

	const store = useSelector(state => state.dataBooking)
	const dispatch = useDispatch()

	const soggiorno = store.soggiorno

	const handlerEliminaTariffa = (tipo, tariffa) => {

		dispatch(
			eliminaTariffaSelezionata([`tipo-${tipo}`, `tar-${tariffa}`])
		)

		// Teoricamente dovrei contare le tariffe
		const lunghezzaTipologia = Object.keys(soggiorno.tariffe[`tipo-${tipo}`]).length

		if (lunghezzaTipologia < 2) {
			dispatch(
				eliminaTipoSelezionato(`tipo-${tipo}`)
			)
		}

		const nomeCamera = `tipo-${tipo}-tar-${tariffa}`
		gestioneOccupazione(nomeCamera, null)
	}

	const optionList = (ospiti) => {
		const optionList = []
		for (let i = 1; i <= ospiti; i++) {
			const selected = ospiti === i ? true : false
			optionList.push(<option selected={selected} value={i}>{i}</option>)
		}
		return optionList
	}

	const setOspitiRoom = (i) => {
		const nomeTipologia = i.nomeTipologia
		const nomeTariffa = i.nomeTariffa
		const nomeCamera = `tipo-${i.tipo}-tar-${i.tariffa}`
		const ospiti = selectRef.current[nomeCamera].value
		const nome = inputRef.current[nomeCamera].value

		if (!inputRef.current[nomeCamera].value.length) {
			return gestioneOccupazione(nomeCamera, null)
		}
		else {
			return gestioneOccupazione(nomeCamera, {
				ospiti: ospiti,
				nome: nome,
				nomeTipologia: nomeTipologia,
				nomeTariffa: nomeTariffa
			})
		}
	}

	return (
		<div className="booking-form-room">
			<div>
				<strong className='titolo'>
					{nomeTipologia}
				</strong>
				<span>
					Tariffa
					<i className="arrow ion-android-arrow-dropright" aria-hidden="true"></i>
					{nomeTariffa}
				</span>

				<ul className="form-container">
					<li>
						<label>Ospiti</label>
						<Input
							type="select"
							value={ospiti}
							onChange={() => setOspitiRoom(info)}
							innerRef={el => (selectRef.current[`tipo-${tipo}-tar-${tariffa}`] = el)}
						>
							{optionList(ospiti)}
						</Input>
					</li>
					<li>
						<label>Nome ospite</label>
						<Input
							autoComplete="off"
							onChange={() => setOspitiRoom(info)}
							innerRef={el => inputRef.current[`tipo-${tipo}-tar-${tariffa}`] = el}
						/>
					</li>
				</ul>
				<span className="remove" onClick={() => handlerEliminaTariffa(tipo, tariffa)}>
					<i className="ion-android-cancel"></i>
				</span>
			</div>
		</div>
	)
}

export default BookingFormRoom