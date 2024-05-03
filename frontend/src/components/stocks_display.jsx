// StocksDisplay component takes a list of stocks and displays them in a list
export const StocksDisplay = ({stocks}) => {
	if (!stocks || stocks.length < 1) {
		return (
			<div id='stock-list' className='m-4'>
				No stocks yet. Please add one above.
			</div>
		);
	}
	console.log('stocks', stocks)
	return (
		<div id='stock-list' className='m-4'>
			<ul>
				{stocks.length > 0 && stocks.map(stock => (
					console.log('stock', stock),
					<li className='flex justify-between' key={stock.name}>
						<div>{stock.name.toUpperCase()}</div>
						<div>${stock.price}</div>
					</li>
				))}
			</ul>
		</div>
	);
}