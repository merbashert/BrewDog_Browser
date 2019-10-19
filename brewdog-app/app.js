$(() => {


    let strongChildren = $('.strong-images').children();
    let strongText = $('.strong-fact');
    let currentImg = 0;
    let currentText = 0;
    let highestIndex = strongChildren.length - 1
    let highestText = strongText.length - 1

    $('.next').on('click', () => {
        strongChildren.eq(currentImg).css("display", "none")
        if (currentImg < highestIndex) {
            currentImg++
        } else {
            currentImg = 0
        }

        strongText.eq(currentText).css("display", "none")
        if (currentText < highestText) {
            currentText++
        } else {
            currentText = 0
        }

        strongChildren.eq(currentImg).css("display", "block")
        strongText.eq(currentText).css("display", "block")
    });

    $('.previous').on("click", () => {
        strongChildren.eq(currentImg).css('display', 'none')

        if (currentImg > 0) {
            currentImg --
        } else {
            currentImg = highestIndex
        }

        strongText.eq(currentText).css('display', 'none')

        if (currentText > 0) {
            currentText --
        } else {
            currentText = highestText
        }

        strongChildren.eq(currentImg).css('display', 'block')
        strongText.eq(currentText).css('display', 'block')
    });



    $('#nameButton').on('click', (event) => {
        event.preventDefault();
        $('#search-result').css("display", "block")

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
                    const $ibu = $('<div>').appendTo($beerInfo).addClass('ibu').text("IBU: " + data[i].ibu)
                    const $food = $('<div>').appendTo($beerInfo).addClass('food').text("Food pairings: " + data[i].food_pairing)
                }
            },
            () => {
                alert("Choose the name of your beer!");
            }
        );
    }); //end of name button

    $('#abvButton').on('click', (event) => {
        event.preventDefault();
        $('#search-result').css("display", "block")

        const minABV = $('#minABV').val();
        const maxABV = $('#maxABV').val();

        const abvAPI = $.ajax({
            url: 'https://api.punkapi.com/v2/beers?abv_gt=' + minABV + '&abv_lt=' + maxABV
        }).then(
            (data) => {
                for (let i = 0; i < 5; i++) {
                    const $beerInfo = $('<div>').addClass("beer-info")
                    $('#search-result').append($beerInfo)
                    const $name = $('<div>').appendTo($beerInfo).addClass('name').text(data[i].name)
                    const $desc = $('<div>').appendTo($beerInfo).addClass('description').text(data[i].description)
                    const $abv = $('<div>').appendTo($beerInfo).addClass('abv').text("ABV: " + data[i].abv)
                    const $ibu = $('<div>').appendTo($beerInfo).addClass('ibu').text("IBU: " + data[i].ibu)
                    const $food = $('<div>').appendTo($beerInfo).addClass('food').text("Food pairings: " + data[i].food_pairing)
                }
            },
            () => {
                alert("Choose your ABV minimum and maximum!");
            }
        );
    }); //end of abv button

    $('#ibuButton').on('click', (event) => {
        event.preventDefault();
        $('#search-result').css("display", "block")

        const minIBU = $('#minIBU').val();
        const maxIBU = $('#maxIBU').val();

        const ibuAPI = $.ajax({
            url: 'https://api.punkapi.com/v2/beers?ibu_gt=' + minIBU + '&ibu_lt=' + maxIBU
        }).then(
            (data) => {
                for (let i = 0; i < 5; i++) {
                    const $beerInfo = $('<div>').addClass("beer-info")
                    $('#search-result').append($beerInfo)
                    const $name = $('<div>').appendTo($beerInfo).addClass('name').text(data[i].name)
                    const $desc = $('<div>').appendTo($beerInfo).addClass('description').text(data[i].description)
                    const $abv = $('<div>').appendTo($beerInfo).addClass('abv').text("ABV: " + data[i].abv)
                    const $ibu = $('<div>').appendTo($beerInfo).addClass('ibu').text("IBU: " + data[i].ibu)
                    const $food = $('<div>').appendTo($beerInfo).addClass('food').text("Food pairings: " + data[i].food_pairing)
                }
            },
            () => {
                alert("Choose your IBU minimum and maximum!");
            }
        );
    }); //end of ipu button

    $('#foodButton').on('click', (event) => {
        event.preventDefault();
        $('#search-result').css("display", "block")

        const foodInput = $('#food').val();

        const foodAPI = $.ajax({
            url: 'https://api.punkapi.com/v2/beers?food=' + foodInput
        }).then(
            (data) => {
                for (let i = 0; i < 5; i++) {
                    const $beerInfo = $('<div>').addClass("beer-info")
                    $('#search-result').append($beerInfo)
                    const $name = $('<div>').appendTo($beerInfo).addClass('name').text(data[i].name)
                    const $desc = $('<div>').appendTo($beerInfo).addClass('description').text(data[i].description)
                    const $abv = $('<div>').appendTo($beerInfo).addClass('abv').text("ABV: " + data[i].abv)
                    const $ibu = $('<div>').appendTo($beerInfo).addClass('ibu').text("IBU: " + data[i].ibu)
                    const $food = $('<div>').appendTo($beerInfo).addClass('food').text("Food pairings: " + data[i].food_pairing)
                }
            },
            () => {
                alert("Choose what food do you want to pair with!");
            }
        ); $('#food').trigger('reset');
    }); //end of food button

    $('.random-box').one('click', (event) => {
        $('h1').css("display", "none");
        const promise = $.ajax({
            url: "https://api.punkapi.com/v2/beers/random"
        }).then(
            (data) => {
                const randomBeerName = $('<div>').text("Name: " + data[0].name)
                const randomBeerDescription = $('<div>').html("Description: " + data[0].description)
                const randomBeerABV = $('<div>').html("ABV: " + data[0].abv)
                const randomBeerIBU = $('<div>').html("IBU: " + data[0].ibu)
                $('.random').append(randomBeerName)
                $('.random').append(randomBeerDescription)
                $('.random').append(randomBeerABV)
                $('.random').append(randomBeerIBU)
            })
        }) //end of random button

    $('#reset').on('click', (event) => {
        $('#search-result').empty().css("display", "none");

    })

    }) //end of onload
