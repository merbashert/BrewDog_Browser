$(() => {


    // const userInput = $('#name').val();
    // const minABV = $('#minABV').val();
    // const maxABV = $('#maxABV').val();
    // const minIBU = $('#minIBU').val();
    // const maxIBU = $('#maxIBU').val();
    // const food = $('#food').val();
    //



    $('#nameButton').on('click', (event) => {
        event.preventDefault();

        const beerName = $('#name').val();

        const beerAPI = $.ajax({
            url: 'https://api.punkapi.com/v2/beers?beer_name=' + beerName
        }).then(
            (data) => {
                for (let i = 0; i < 5; i++) {
                    const $beerInfo = $('<div>').addClass("beer-info")
                    $('#search-result').append($beerInfo)
                    const $name = $('<div>').appendTo($beerInfo).addClass('name').text(data[i].name)
                    const $desc = $('<div>').appendTo($beerInfo).addClass('description').text(data[i].description)
                    const $abv = $('<div>').appendTo($beerInfo).addClass('abv').text("ABV: " + data[i].abv)
                    const $food = $('<div>').appendTo($beerInfo).addClass('food').text("Food pairings: " + data[i].food_pairing)
                }
            }
            // ,
            // () => {
            //     alert("What's the name?");
            // }
        );
    }); //end of name button

    $('#foodButton').on('click', (event) => {
        event.preventDefault();

        const food = $('#food').val();

        const promise = $.ajax({
            url: 'https://api.punkapi.com/v2/beers?food=' + food
        }).then(
            (data) => {
                for (let i = 0; i < 5; i++) {
                    const $beerInfo = $('<div>').addClass("beer-info")
                    $('#search-result').append($beerInfo)
                    const $name = $('<div>').appendTo($beerInfo).addClass('name').text(data[i].name)
                    const $desc = $('<div>').appendTo($beerInfo).addClass('description').text(data[i].description)
                    const $abv = $('<div>').appendTo($beerInfo).addClass('abv').text("ABV: " + data[i].abv)
                    const $food = $('<div>').appendTo($beerInfo).addClass('food').text("Food pairings: " + data[i].food_pairing)
                }
            }
            // ,
            // () => {
            //     alert("What's the name?");
            // }
        );
    }); //end of food button

}) //end of onload
