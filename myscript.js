const API_KEY = 'xxxxxx';

const getMovieRating = async (title) => {
	const res = await fetch(`https://www.omdbapi.com/?t=${title}&y=&plot=short&r=json&apikey=${API_KEY}`);
	const data = await res.json();
	return data.imdbRating;
}

const editNodes = async (nodes) => {
	for (let i = 0; i < nodes.length; i++) {
		const title = nodes[i].innerHTML;
		const rating = await getMovieRating(title);
		if (rating) {
			nodes[i].innerHTML = `${title}: ${rating} ⭐️`;
		}
	}
}

(async () => {
	const movieTitleNodes1 = document.getElementsByClassName('full-width-tile__title');
	await editNodes(movieTitleNodes1);
	const movieTitleNodes2 = document.getElementsByClassName('film-title');
	await editNodes(movieTitleNodes2);
	const movieTitleNodes3 = document.getElementsByClassName('film-show__titles__title');
	await editNodes(movieTitleNodes3);
})()

