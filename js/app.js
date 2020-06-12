$(() => {
    let strongChildren = $('.strong-images').children();
    let strongText = $('.strong-fact');
    let currentImg = 0;
    let currentText = 0;
    let highestIndex = strongChildren.length - 1
    let highestText = strongText.length - 1
    //add variables for slideshow function

    let faveBeers = localStorage.getItem('Favorite Beers') ?
    JSON.parse(localStorage.getItem('Favorite Beers')) : []
    //ternary if statement to check if there's content in local storage, and if so, to turn that data into JSON, and if not to return an empty array
    //get fave beers from local storage
    //code modeled after https://www.taniarascia.com/how-to-use-local-storage-with-javascript/


    localStorage.setItem('Favorite Beers', JSON.stringify(faveBeers));
    for (let i = 0; i < faveBeers.length; i++) {
        $('<div>').text("•" + faveBeers[i]).appendTo('#modal').addClass("fave-remember")
    }
    //Creates an item in local storage called Favorite beers, turns the JSON into strings inside an array, then use a for loop to append divs of each item to the favebeers modal
    //create beer favorites list

    /////////////////////////////////////////////////////////////////
    //Buttons//
    /////////////////////////////////////////////////////////////////

    $('.clear').on("click", () => {
        localStorage.clear();
        $('.fave-remember').remove();
    })
    //empties out local storage and removes the class

    $('.hide').on("click", () => {
        $('#modal').slideUp(400)
    })

    $('#abvButton').hover(() => {
        $('#abvExplanation').toggle();
    })
    //changes the visibility of the explanation

    $('#ibuButton').hover(() => {
        $('#ibuExplanation').toggle();
    })

    $('.next').on('click', () => {
        strongChildren.eq(currentImg).css("display", "none")
        //make the current image invisible
        if (currentImg < highestIndex) {
            currentImg++
            //change the index number to the next image
        } else {
            currentImg = 0
            //otherwise return to the beginning of the image array
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

    $('.fave-heading').on("click", () => {
        $('#modal').slideToggle(400);
    })
    //show favorite menu

    $('#reset').on('click', (event) => {
        $('#search-result').empty().css("display", "none");
        $('.click-beer').css("display", "none");

    })//end of reset button

    /////////////////////////////////////////////////////////////////
    //API Functions//
    ////////////////////////////////////////////////////////////////

    $('#nameButton').on('click', (event) => {
        event.preventDefault();
        $('#search-result').empty()

        $('#search-result').css("display", "block")
        //show results of search
        const beerName = $('#name').val();

        $('input').val('');
        //reset value of input box

        const beerAPI = $.ajax({
            url: 'https://api.punkapi.com/v2/beers?beer_name=' + beerName
        }).then(
            (data) => {
                $('.click-beer').css("display", "block")
                //show click on beer message
                for (let i = 0; i < 5; i++) {
                    const $beerInfo = $('<div>').addClass("beer-info")
                    $('#search-result').append($beerInfo)
                    const $name = $('<div>').appendTo($beerInfo).addClass('name').text(data[i].name)


                    const $beerMoreInfo = $('<div>').appendTo($beerInfo).addClass("more-info")
                    const $add = $('<div>').appendTo($beerMoreInfo).text("+ Add to My Favorite Beers").addClass("add")

                    $name.on("click", () => {
                        $beerMoreInfo.toggle();
                    }) //show more beer info

                    $add.on("click", () => {
                        if(faveBeers.indexOf(data[i].name) == -1) {
                            faveBeers.push(data[i].name)
                            localStorage.setItem('Favorite Beers', JSON.stringify(faveBeers));
                            $div = $('<div>').appendTo('#modal').text("•" + faveBeers[faveBeers.length-1]).addClass("fave-remember")
                            $('#modal').slideDown(400).delay(2000).slideUp(400);
                        }
                        else {
                            alert("Beer already in favorites list!")
                        }
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
        $('#search-result').empty()

        $('#search-result').css("display", "block")

        const minABV = $('#minABV').val();
        const maxABV = $('#maxABV').val();
        $('input').val('');

        const abvAPI = $.ajax({
            url: 'https://api.punkapi.com/v2/beers?abv_gt=' + minABV + '&abv_lt=' + maxABV
        }).then(
            (data) => {
                $('.click-beer').css("display", "block")
                for (let i = 0; i < 5; i++) {
                    const $beerInfo = $('<div>').addClass("beer-info")
                    $('#search-result').append($beerInfo)
                    const $name = $('<div>').appendTo($beerInfo).addClass('name').text(data[i].name)

                    const $beerMoreInfo = $('<div>').appendTo($beerInfo).addClass("more-info")
                    const $add = $('<div>').appendTo($beerMoreInfo).text("+ Add to My Favorite Beers").addClass("add")

                    $name.on("click", () => {
                        $beerMoreInfo.toggle();
                    })

                    $add.on("click", () => {
                        if(faveBeers.indexOf(data[i].name) == -1) {
                            faveBeers.push(data[i].name)
                            localStorage.setItem('Favorite Beers', JSON.stringify(faveBeers));
                            $div = $('<div>').appendTo('#modal').text("•" + faveBeers[faveBeers.length-1]).addClass("fave-remember")
                            $('#modal').slideDown(400).delay(2000).slideUp(400);
                        }
                        else {
                            alert("Beer already in favorites list!")
                        }
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
        $('#search-result').empty()

        $('#search-result').css("display", "block")

        const minIBU = $('#minIBU').val();
        const maxIBU = $('#maxIBU').val();

        $('input').val('');

        const ibuAPI = $.ajax({
            url: 'https://api.punkapi.com/v2/beers?ibu_gt=' + minIBU + '&ibu_lt=' + maxIBU
        }).then(
            (data) => {
                $('.click-beer').css("display", "block")

                for (let i = 0; i < 5; i++) {
                    const $beerInfo = $('<div>').addClass("beer-info")
                    $('#search-result').append($beerInfo)
                    const $name = $('<div>').appendTo($beerInfo).addClass('name').text(data[i].name)


                    const $beerMoreInfo = $('<div>').appendTo($beerInfo).addClass("more-info")
                    const $add = $('<div>').appendTo($beerMoreInfo).text("+ Add to My Favorite Beers").addClass("add")

                    $name.on("click", () => {
                        $beerMoreInfo.toggle();
                    })

                    $add.on("click", () => {
                        if(faveBeers.indexOf(data[i].name) == -1) {
                            faveBeers.push(data[i].name)
                            localStorage.setItem('Favorite Beers', JSON.stringify(faveBeers));
                            $div = $('<div>').appendTo('#modal').text("•" + faveBeers[faveBeers.length-1]).addClass("fave-remember")
                            $('#modal').slideDown(400).delay(2000).slideUp(400);
                        }
                        else {
                            alert("Beer already in favorites list!")
                        }
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
        $('#search-result').empty()

        $('#search-result').css("display", "block")

        const foodInput = $('#food').val();
        $('input').val('');

        const foodAPI = $.ajax({
            url: 'https://api.punkapi.com/v2/beers?food=' + foodInput
        }).then(
            (data) => {
                $('.click-beer').css("display", "block")

                for (let i = 0; i < 5; i++) {
                    const $beerInfo = $('<div>').addClass("beer-info")
                    $('#search-result').append($beerInfo)
                    const $name = $('<div>').appendTo($beerInfo).addClass('name').text(data[i].name)


                    const $beerMoreInfo = $('<div>').appendTo($beerInfo).addClass("more-info")
                    const $add = $('<div>').appendTo($beerMoreInfo).text("+ Add to My Favorite Beers").addClass("add")

                    $name.on("click", () => {
                        $beerMoreInfo.toggle();
                    })

                    $add.on("click", () => {
                        if(faveBeers.indexOf(data[i].name) == -1) {
                            faveBeers.push(data[i].name)
                            localStorage.setItem('Favorite Beers', JSON.stringify(faveBeers));
                            $div = $('<div>').appendTo('#modal').text("•" + faveBeers[faveBeers.length-1]).addClass("fave-remember")
                            $('#modal').slideDown(400).delay(2000).slideUp(400);
                        }
                        else {
                            alert("Beer already in favorites list!")
                        }
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

    $('.random').one('click', (event) => {
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
                const $add = $('<div>').appendTo($('.random')).text("+ Add to My Favorite Beers").addClass("add")

                $add.on("click", () => {
                    if(faveBeers.indexOf(data[0].name) == -1) {
                        faveBeers.push(data[0].name)
                        localStorage.setItem('Favorite Beers', JSON.stringify(faveBeers));
                        $div = $('<div>').appendTo('#modal').text("•" + faveBeers[faveBeers.length-1]).addClass("fave-remember")
                        $('#modal').slideDown(400).delay(2000).slideUp(400);
                    }
                    else {
                        alert("Beer already in favorites list!")
                    }
                })

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





        }) //end of onload
