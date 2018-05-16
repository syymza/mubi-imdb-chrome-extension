const API_KEY = 'xxxxxx';

const getMovieRating = async (title) => {
	const res = await fetch(`https://www.omdbapi.com/?t=${title}&y=&plot=short&r=json&apikey=${API_KEY}`);
	const data = await res.json();
	return data.imdbRating;
}

(async () => {
	const movieTitleNodes = [
		...document.getElementsByClassName('film-show__titles__title'),
		...document.getElementsByClassName('full-width-tile__title'),
		...document.getElementsByClassName('film-title')
	];

	const ratings = await Promise.all(movieTitleNodes.map(node => node.innerHTML).map(async title => getMovieRating(title)));
	movieTitleNodes.forEach((node, index) => {
		const title = node.innerHTML;
		const rating = ratings[index];
		if (rating) {
			node.innerHTML = `${title}: ${rating} ⭐️`;
		}
	})
})()

