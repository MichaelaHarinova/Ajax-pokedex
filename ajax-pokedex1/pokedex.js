document.getElementById("run").addEventListener("click", () => {
    console.log("click")

    let searchValue = document.getElementById("poke-id").value;


    pokemonData(searchValue).then(pokemon => {
        console.log(pokemon)

        let imageURL = pokemon.sprites.front_default;
        let name = pokemon.name;
        let fourMoves = [];
        let moves = pokemon.moves.slice(0, 4);
        moves.forEach(move => fourMoves.push(move.move.name));


        let pokemonID = pokemon.id;
        let speciesUrl = pokemon.species.url;

        console.log()
        data(speciesUrl).then(evolutionChain => {
                let prevEvolution;

                try {
                    prevEvolution = evolutionChain.evolves_from_species.name;
                } catch {
                    prevEvolution = "";
                }

                pokemonData(prevEvolution).then(prevEvolutionPoke => {
                    let prevEvoImgURL

                    try {
                        prevEvoImgURL = prevEvolutionPoke.sprites.front_default;
                    } catch {
                        prevEvoImgURL = "";
                    }


                    document.getElementById("show-id").innerText = pokemonID;
                    document.getElementById("actualEvoImg").setAttribute("src", imageURL);
                    document.querySelector(".name").innerText = name;
                    document.querySelector(".evolutions").innerText = prevEvolution;
                    document.getElementById("previousEvoImg").setAttribute("src", prevEvoImgURL);
                    document.querySelectorAll(".move").forEach((p, index) => {
                        p.innerText = fourMoves[index];
                        if (fourMoves[index] === undefined) {
                            p.innerText = " - ";
                        }
                    });

                })
            }
            , rej => console.error(rej))
    });

    async function evolutionData(pokemonID) {
        const response = await fetch("https://pokeapi.co/api/v2/evolution-chain/" + pokemonID);
        return await response.json();
    }

    async function data(url) {
        const response = await fetch(url);
        return await response.json();
    }

    async function pokemonData(searchValue) {

        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + searchValue);
        console.log(response)
        return await response.json();
    }

})


