Vue.component('review-stars', {
	template:`<div class="star-rating">
        <label class="star-rating-star" v-for="rating in ratings"
        :class="{'is-selected': ((value >= rating) && value != null), 'is-disabled': disabled}"
        v-on:click="updateValue(rating)" v-on:mouseover="updateValue(rating)" v-on:mouseout="updateValue(rating)">
        <input class="star-rating star-rating-checkbox" type="radio" :value="rating"
        v-model="value" :disabled="disabled">★</label></div>`,
	props:['value', 'disabled'],
	data: function() {
		return {
			ratings: [1,2,3,4,5]
		}
	},
	methods: {
		updateValue: function(value) {
			if(!this.disabled) {
				this.$emit('input', value);
			}
		}
	}
}),


var myVideoApp = {

	movies:function(data){ //take data in and assign to movie attribute
  	myVideoApp.vm.movie = data;
	},

	movieReviews:function(data) {
		//process the review data and push it into the Vue instance
		data.forEach(review => myVideoApp.vm.reviews.push(review));

	},

	vm: new Vue({
        delimiters: ['${','}'],
        el: '#video',
        data: {
            reviews: [],
            numStars: 0,
            review: '',
            testMessage:"Testing"

        },
        created:{
					let movieId = document.querySelector('.movId').textContent;
					axios.get('api/movies/'+movieID)
					.then(response=>{
					  console.log(response.data);
					})
					.catch(err=>{
					  console.log(err);
					});
        },

		methods: {
			addReview() {
				let movieId = document.querySelector('.movId').textContent;
				axios.post('/api', {
					id:movieId,
					stars: this.numStars,
					comment: this.review
				})
				.then( response => {
					console.log(response);
				})
				.catch( error => {
					console.log(error);
				});

				//push into reviews array
				this.reviews.push({
					comments_copy:this.review,
					comments_rating :this.numStars,
					comments_date: `${new Date()}`
				});
				this.review = "";
				this.numStars = 0;
				// fetch('/api', {
				// 	method: 'post',
				// 	headers: {
				// 		'Accept': 'applications/json, text-plain, */*',
				// 		'Content-Type': 'application/json'
				// 	},
				// 	body: JSON.stringify({
				// 		id:movieId,
				// 		stars: this.numStars,
				// 		comment: this.review
				// 	})
				// 	})
				// 	.then((resp) => resp.json())
				// 	.then((data) => {
				// 		console.log(data);
				// 	})
				// 	.catch((error) =>{
				// 		console.log(error);
				// 	});
				}
		}

	})
}
myVideoApp.movieReviews(appData.movies);
