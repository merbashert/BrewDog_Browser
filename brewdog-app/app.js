$(() => {
    let strongChildren = $('.strong-images').children();
    let strongText = $('.strong-fact');
    let currentImg = 0;
    let currentText = 0;
    let highestIndex = strongChildren.length - 1
    let highestText = strongText.length - 1
    //add variables for slideshow function

    $('.next').on('click', () => {
        strongChildren.eq(currentImg).css("display", "none")
        if (currentImg < highestIndex) {
            currentImg++
        } else {
            currentImg = 0
        }
        //loop through images

        strongText.eq(currentText).css("display", "none")
        if (currentText < highestText) {
            currentText++
        } else {
            currentText = 0
        }
        //loop through text cards

        strongChildren.eq(currentImg).css("display", "block")
        strongText.eq(currentText).css("display", "block")
        //switch next image display to block

    });
    //adding functionality to next button

    $('.previous').on("click", () => {
        strongChildren.eq(currentImg).css('display', 'none')

        if (currentImg > 0) {
            currentImg --
        } else {
            currentImg = highestIndex
        }
        //loop through images backwards

        strongText.eq(currentText).css('display', 'none')

        if (currentText > 0) {
            currentText --
        } else {
            currentText = highestText
        } //loop through text cards backwards

        strongChildren.eq(currentImg).css('display', 'block')
        strongText.eq(currentText).css('display', 'block')
        //change display of next image and text cards
    });
    //adding functionality to previous button


    $('#nameButton').on('click', (event) => {
        event.preventDefault();

        $('.click-beer').css("display", "block")
        //show click on beer message
        $('#search-result').css("display", "block")
        //show results of search
        const beerName = $('#name').val();
        $('input').val('');
        //reset value of input box
        const beerAPI = $.ajax({
            url: 'https://api.punkapi.com/v2/beers?beer_name=' + beerName
        }).then(
            (data) => {
                for (let i = 0; i < 5; i++) {
                    const $beerInfo = $('<div>').addClass("beer-info")
                    $('#search-result').append($beerInfo)
                    const $name = $('<div>').appendTo($beerInfo).addClass('name').text(data[i].name)

                    const $beerMoreInfo = $('<div>').appendTo($beerInfo).addClass("more-info")

                    $name.on("click", () => {
                        $beerMoreInfo.toggle();
                    })
                    const $desc = $('<div>').appendTo($beerMoreInfo).addClass('description').text(data[i].description)
                    const $abv = $('<div>').appendTo($beerMoreInfo).addClass('abv').text("ABV: " + data[i].abv)
                    const $ibu = $('<div>').appendTo($beerMoreInfo).addClass('ibu').text("IBU: " + data[i].ibu)
                    const $food = $('<div>').appendTo($beerMoreInfo).addClass('food').text("Food pairings: " + data[i].food_pairing)
                }
            },
            () => {
                alert("Choose the name of your beer!");
            }//pull info from AJAX
        );
    }); //end of name button functionality

    $('#abvButton').on('click', (event) => {
        event.preventDefault();

        $('.click-beer').css("display", "block")

        $('#search-result').css("display", "block")

        const minABV = $('#minABV').val();
        const maxABV = $('#maxABV').val();
        $('input').val('');

        const abvAPI = $.ajax({
            url: 'https://api.punkapi.com/v2/beers?abv_gt=' + minABV + '&abv_lt=' + maxABV
        }).then(
            (data) => {
                for (let i = 0; i < 5; i++) {
                    const $beerInfo = $('<div>').addClass("beer-info")
                    $('#search-result').append($beerInfo)
                    const $name = $('<div>').appendTo($beerInfo).addClass('name').text(data[i].name)

                    const $beerMoreInfo = $('<div>').appendTo($beerInfo).addClass("more-info")

                    $name.on("click", () => {
                        $beerMoreInfo.toggle();
                    })

                    const $desc = $('<div>').appendTo($beerMoreInfo).addClass('description').text(data[i].description)
                    const $abv = $('<div>').appendTo($beerMoreInfo).addClass('abv').text("ABV: " + data[i].abv)
                    const $ibu = $('<div>').appendTo($beerMoreInfo).addClass('ibu').text("IBU: " + data[i].ibu)
                    const $food = $('<div>').appendTo($beerMoreInfo).addClass('food').text("Food pairings: " + data[i].food_pairing)
                }
            },
            () => {
                alert("Choose your ABV minimum and maximum!");
            }
        );
    }); //end of abv button functionality

    $('#ibuButton').on('click', (event) => {
        event.preventDefault();

        $('.click-beer').css("display", "block")

        $('#search-result').css("display", "block")

        const minIBU = $('#minIBU').val();
        const maxIBU = $('#maxIBU').val();

        $('input').val('');

        const ibuAPI = $.ajax({
            url: 'https://api.punkapi.com/v2/beers?ibu_gt=' + minIBU + '&ibu_lt=' + maxIBU
        }).then(
            (data) => {
                for (let i = 0; i < 5; i++) {
                    const $beerInfo = $('<div>').addClass("beer-info")
                    $('#search-result').append($beerInfo)
                    const $name = $('<div>').appendTo($beerInfo).addClass('name').text(data[i].name)

                    const $beerMoreInfo = $('<div>').appendTo($beerInfo).addClass("more-info")

                    $name.on("click", () => {
                        $beerMoreInfo.toggle();
                    })

                    const $desc = $('<div>').appendTo($beerMoreInfo).addClass('description').text(data[i].description)
                    const $abv = $('<div>').appendTo($beerMoreInfo).addClass('abv').text("ABV: " + data[i].abv)
                    const $ibu = $('<div>').appendTo($beerMoreInfo).addClass('ibu').text("IBU: " + data[i].ibu)
                    const $food = $('<div>').appendTo($beerMoreInfo).addClass('food').text("Food pairings: " + data[i].food_pairing)
                }
            },
            () => {
                alert("Choose your IBU minimum and maximum!");
            }
        );
    }); //end of ipu button functionality

    $('#foodButton').on('click', (event) => {
        event.preventDefault();

        $('.click-beer').css("display", "block")

        $('#search-result').css("display", "block")

        const foodInput = $('#food').val();
        $('input').val('');

        const foodAPI = $.ajax({
            url: 'https://api.punkapi.com/v2/beers?food=' + foodInput
        }).then(
            (data) => {
                for (let i = 0; i < 5; i++) {
                    const $beerInfo = $('<div>').addClass("beer-info")
                    $('#search-result').append($beerInfo)
                    const $name = $('<div>').appendTo($beerInfo).addClass('name').text(data[i].name)

                    const $beerMoreInfo = $('<div>').appendTo($beerInfo).addClass("more-info")

                    $name.on("click", () => {
                        $beerMoreInfo.toggle();
                    })

                    const $desc = $('<div>').appendTo($beerMoreInfo).addClass('description').text(data[i].description)
                    const $abv = $('<div>').appendTo($beerMoreInfo).addClass('abv').text("ABV: " + data[i].abv)
                    const $ibu = $('<div>').appendTo($beerMoreInfo).addClass('ibu').text("IBU: " + data[i].ibu)
                    const $food = $('<div>').appendTo($beerMoreInfo).addClass('food').text("Food pairings: " + data[i].food_pairing)
                }
            },
            () => {
                alert("Choose what food do you want to pair with!");
            }
        ); $('#food').trigger('reset');
    }); //end of food button functionality

    $('.random-box').one('click', (event) => {
        $('h1').remove();
        $('.random').css("display", "block");
        //clear "get a random beer" text, add random beer
        const $promise = $.ajax({
            url: "https://api.punkapi.com/v2/beers/random"
        }).then(
            (data) => {
                const randomBeerName = $('<div>').text("Name: " + data[0].name)
                const randomBeerDescription = $('<div>').html("Description: " + data[0].description)
                const randomBeerABV = $('<div>').html("ABV: " + data[0].abv)
                const randomBeerIBU = $('<div>').html("IBU: " + data[0].ibu)
                const clickForAnother = $('<div>').text("Click for another random beer!").addClass("click-for-another")
                $('.random').append(randomBeerName)
                $('.random').append(randomBeerDescription)
                $('.random').append(randomBeerABV)
                $('.random').append(randomBeerIBU)
                $('.random').append(clickForAnother)
            })

            $('.random').on("click", (event) => {
                $('.random').empty();
                const $promise = $.ajax({
                    url: "https://api.punkapi.com/v2/beers/random"
                }).then(
                    (data) => {
                        const randomBeerName = $('<div>').text("Name: " + data[0].name)
                        const randomBeerDescription = $('<div>').html("Description: " + data[0].description)
                        const randomBeerABV = $('<div>').html("ABV: " + data[0].abv)
                        const randomBeerIBU = $('<div>').html("IBU: " + data[0].ibu)
                        const clickForAnother = $('<div>').text("Click for another random beer!").addClass("click-for-another")
                        $('.random').append(randomBeerName)
                        $('.random').append(randomBeerDescription)
                        $('.random').append(randomBeerABV)
                        $('.random').append(randomBeerIBU)
                        $('.random').append(clickForAnother)
                    })
            })
        }) //end of random button


        $('#reset').on('click', (event) => {
            $('#search-result').empty().css("display", "none");
            $('.click-beer').css("display", "none");

        })//end of reset button

    }) //end of onload
