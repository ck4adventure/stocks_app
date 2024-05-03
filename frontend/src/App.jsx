import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import { HeaderBar } from './components/header_bar'
import { StocksDisplay } from './components/stocks_display'
import { LoggedOutPage } from './components/logged_out'

function App() {
	const [user, setUser] = useState(null)
	const [newStock, setNewStock] = useState('')
	const [stocks, setStocks] = useState([])

	const onChooseUser = (user) => {
		setUser(user)
	}

	const handleLogout = () => {
		setUser(null)
	}

	const handleInputChange = (event) => {
		setNewStock(event.target.value)
	}

	const handleStockSubmit = async () => {
		try {
			console.log('Adding stock:', newStock)
			const response = await axios.post(`http://localhost:3000/api/stocks?user=${user.id}&name=${newStock}`)

			if (response.status != 200) {
				console.log(response.statusText)
				throw new Error('Failed to add stock')
			}
			console.log(response.data)
			const jsonData = response.data
			setNewStock('')
			setStocks(jsonData)

		} catch (error) {
			console.error('Error adding stock:', error)
		}

	}

	useEffect(() => {
		if (user) {
			const interval = setInterval(async () => {
				try {
					const response = await axios.get(`http://localhost:3000/api/stocks?user=${user.id}`)
					if (response.status != 200) {
						console.log(response.statusText)
						throw new Error('Failed to get stocks')
					}
					const jsonData = response.data
					console.log(jsonData)
					setStocks(jsonData)
				} catch (error) {
					console.error('Error getting stocks:', error)
				}
			}, 1000);
			return () => clearInterval(interval);
		}
	}, [user]);


	// quick way to add in a demo login page
	if (!user) {
		return (
			<>
				<HeaderBar user={user} />
				<LoggedOutPage onChooseUser={onChooseUser} />
			</>
		)
	}

	return (
		<>
			<HeaderBar user={user} handleLogout={handleLogout} />
			<div id='content' className='flex flex-col m-auto max-w-72'>
				<div id='stock-input-field' className='m-4'>
					<h2>Add a stock</h2>
					<input onChange={handleInputChange} value={newStock} type='text' placeholder='Stock symbol' />
					<button onClick={handleStockSubmit}>Add</button>
				</div>
				<StocksDisplay stocks={stocks} />
			</div>

		</>
	)
}

export default App
