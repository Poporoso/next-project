/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'

import {
	selezionaSoggiorno,
	eliminaTariffaSelezionata,
	setPrezzoSoggiorno,
	eliminaTipoSelezionato,
	resetSoggiorno
} from '../../store/dataBookingSlice'

import { renderText } from '../../helper/Helper';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../block/Loading'

const BookingRoomList = ({ setNexButtonStatus }) => {

	const [isLoading, setIsLoading] = useState(true)

	const dispatch = useDispatch()
	const selectRefs = useRef([])

	const [camereDisponibili, setCamereDisponibili] = useState({})
	const [prezzoParziale, setPrezzoParziale] = useState(0)
	const store = useSelector(state => state.dataBooking)

	const soggiorno = store.soggiorno
	const dataBook = store.data?.data_book
	const rooms = dataBook?.day_booking
	const booking = dataBook?.info

	const checkDisponibilita = (e) => {

		let nomeTipo = `tipo-${e.tipo}`
		let nomeTariffa = `tar-${e.tariffa}`
		const listaTariffe = camereDisponibili[e.tipo].tariffe

		// Estraggo le camere selezionate di questo tipo
		let camereRestanti = e.max

		listaTariffe && Object.entries(listaTariffe).map((item) => {

			// Ottengo il nome della tariffa
			let key = Number(item[0])

			// Ricavo la selezione attuale della select
			const numFromSelect = selectRefs.current[`${nomeTipo}-tar-${key}`].state.selectValue[0]?.value

			// Ottengo il valore in base alla tariffa attuale/e delle altre della tipologia
			let valoreSelect = key === e.tariffa
				? e.value
				: numFromSelect ? numFromSelect : 0

			// Scalo la quantita di camere dal totale
			return camereRestanti -= valoreSelect
		})

		listaTariffe && Object.entries(listaTariffe).map((item) => {

			// Ottengo il nome della tariffa
			let key = Number(item[0])

			// Ricavo la selezione attuale della select
			const numFromSelect = selectRefs.current[`${nomeTipo}-tar-${key}`].state.selectValue[0]?.value

			// Ottengo il valore in base alla tariffa attuale/e delle altre della tipologia
			let valoreSelect = key === e.tariffa
				? e.value
				: numFromSelect ? numFromSelect : 0

			let y = 0;
			item[1].map((itemTar, index) => {

				if ((index) > valoreSelect) {
					if (y < camereRestanti) {
						y++
						return (
							itemTar.isdisabled = false
						)
					}
					else {
						return (
							itemTar.isdisabled = true
						)
					}
				}
				return null
			})

			return null
		})

		let newObj = {
			ospiti: e.ospiti,
			tipo: e.tipo,
			tariffa: e.tariffa,
			prezzo: e.prezzo,
			quantita: e.value,
			nomeTipologia: e.nomeTipologia,
			nomeTariffa: e.nomeTariffa,
		}

		if (e.prezzo === 0) {

			// Se la selezione è vuota blocco
			if (
				!Object.keys(soggiorno.tariffe).length ||
				soggiorno.tariffe[`tipo-${e.tipo}`] === undefined
			) {
				return
			}

			if (soggiorno.tariffe[`tipo-${e.tipo}`][`tar-${e.tariffa}`] === undefined) {
				return
			}

			const tariffaPresente = soggiorno.tariffe[`tipo-${e.tipo}`][`tar-${e.tariffa}`]
			if (tariffaPresente?.prezzo) {
				setPrezzoParziale((current) => current - tariffaPresente.prezzo)
			}

			const lunghezzaTipologia = Object.keys(soggiorno.tariffe[`tipo-${e.tipo}`]).length

			dispatch(
				eliminaTariffaSelezionata([`tipo-${e.tipo}`, `tar-${e.tariffa}`], lunghezzaTipologia)
			)
			if (lunghezzaTipologia < 2) {
				dispatch(
					eliminaTipoSelezionato(`tipo-${e.tipo}`)
				)
			}
			return
		}

		// Aggiorno prezzo
		// console.log('Sto per aggiungere: ', e.prezzo)

		if (soggiorno.tariffe[`tipo-${e.tipo}`] !== undefined) {
			// Il tipo di camera è presente, controllo se c'è la tariffa
			const tariffaPresente = soggiorno.tariffe[`tipo-${e.tipo}`][`tar-${e.tariffa}`]
			// console.log('Il tipo di camera è presente:', tariffaPresente)

			//console.log('Vecchia: ', tariffaPresente?.quantita, 'Nuova: ', e.value)

			// Recupero la quantita attualmente salvata
			if (tariffaPresente?.quantita) {
				if (e.value > tariffaPresente?.quantita || e.value < tariffaPresente?.quantita) {
					//console.log('Aggiungo quantita')
					setPrezzoParziale((current) => {
						current = (current - tariffaPresente.prezzo) + e.prezzo
						return current
					})
				} else {
					//console.log('Non faccio nulla ed esco')
				}
			} else {
				setPrezzoParziale((current) => current += e.prezzo)
			}
		} else {
			setPrezzoParziale((current) => current += e.prezzo)
		}

		dispatch(
			selezionaSoggiorno({
				...soggiorno,
				tariffe: {
					...soggiorno.tariffe,
					[nomeTipo]: {
						...soggiorno.tariffe[nomeTipo],
						[nomeTariffa]: newObj
					}
				}
			})
		)
	}

	const popolaSelect = ({ ospiti, unita, prezzo, tipo, nomeTipologia, nomeTariffa, tariffa }) => {

		const tar = []
		for (let i = 0; i <= unita; i++) {
			const prezzoFinale = (prezzo * i).toFixed(2)

			const label = i ? `${i} - € ${prezzoFinale}` : i
			const obj = {
				ospiti: ospiti,
				value: i,
				label: label,
				isdisabled: false,
				tipo: tipo,
				tariffa: tariffa,
				max: unita,
				nomeTipologia: nomeTipologia,
				nomeTariffa: nomeTariffa,
				prezzo: Number(prezzoFinale)
			}
			tar.push(obj);
		}

		setCamereDisponibili((previousState) => {
			return {
				...previousState,
				[tipo]: {
					...previousState[tipo],
					tariffe: {
						...previousState[tipo]?.tariffe,
						[tariffa]: tar,
					},
					max: unita,
					selezione: 0,
					disponibili: 0
				}
			}
		})

		return;
	}

	useEffect(() => {
		dispatch(
			setPrezzoSoggiorno({
				prezzo: prezzoParziale,
				tipo: 'rooms'
			})
		)
	}, [prezzoParziale, dispatch])

	useEffect(() => {

		rooms && rooms.map((item) => {
			return (
				Object.entries(item.tariffe).map((tar) => {
					return (
						popolaSelect({
							unita: item.unita,
							ospiti: item.ospiti,
							prezzo: tar[1].prezzo,
							tipo: item.id_tipologia,
							nomeTipologia: item.nome_tipologia,
							nomeTariffa: tar[1].nome_tariffa,
							tariffa: tar[1].id_tariffa
						})
					)
				})
			)
		})

		booking && dispatch(
			selezionaSoggiorno({
				checkinJs: booking.checkin_js,
				checkoutJs: booking.checkout_js,
				checkin: booking.checkin_it,
				checkout: booking.checkout_it,
				checkin_ext: booking.checkin_ext,
				checkout_ext: booking.checkout_ext,
				notti: booking.notti,
				adulti: booking.adulti,
				bambini: booking.bambini,
				tariffe: []
			})
		)
	}, [rooms, booking, dispatch])

	useEffect(() => {
		dispatch(
			resetSoggiorno()
		)
		setPrezzoParziale(0)
	}, [rooms])

	useEffect(() => {
		Object.keys(soggiorno.tariffe).length
			? setNexButtonStatus(false)
			: setNexButtonStatus(true)
	}, [soggiorno.tariffe])

	useEffect(() => {
		if (rooms) {
			setIsLoading(false)
		}
	}, [rooms])

	return (
		<>
			<Loading status={isLoading} />
			<section className="booking__room-list">
				<h2>
					Camere disponibili
				</h2>
				{
					!rooms && 'selezionare una dat'
				}
				{
					rooms && rooms.map((item, index) => {
						var immagine = `${process.env.NEXT_PUBLIC_UPLOADS_URL}${item.immagine}`

						return (
							<div className='booking__room-row no-flex' key={index}>
								<h6>
									<span>
										{renderText('<i className="icon ion-man"></i>'.repeat(item.ospiti))}
									</span>
									{item.nome_tipologia}
								</h6>
								<div className='booking__room-col'>
									<div className='immagine' style={{ backgroundImage: `url(${immagine})` }}></div>
									<div className='tariffe'>
										{
											Object.entries(item.tariffe).map((tariffa) => {
												return (
													<div key={tariffa[1].id_tariffa}>
														<div className='tariffe__title'>
															<span>{tariffa[1].nome_tariffa}</span>
															<div className='tariffe__title-prezzo'>
																Prezzo camera {tariffa[1].prezzo}, al giorno: {tariffa[1].prezzo / booking.notti}
															</div>
														</div>
														<div className='tariffe__row'>

															<div className='tariffe__row-descrizione'>
																{renderText(tariffa[1].descrizione_uns['it'].replace(/\\/g, ""))}
															</div>
															<div className="tariffe__row-seleziona">
																<Select
																	defaultValue={{ value: 0, label: '0' }}
																	options={camereDisponibili[`${item.id_tipologia}`]?.tariffe[`${tariffa[1].id_tariffa}`]}
																	onChange={(e) => checkDisponibilita(e)}
																	isOptionDisabled={(option) => option.isdisabled}
																	ref={el => (selectRefs.current[`tipo-${item.id_tipologia}-tar-${tariffa[1].id_tariffa}`] = el)}
																	cacheOptions={false}
																/>
															</div>
														</div>
													</div>
												)
											})
										}
									</div>
								</div>
							</div>
						)
					})
				}
			</section>
		</>

	)
}

export default BookingRoomList