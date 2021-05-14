//Déclaration compteurs de score
let pvJoueur = 3
let pvOrdi = 3
let musique = new Audio('assets/audio/musique.mp3');
musique.volume = 0.3
let victory = new Audio('assets/audio/victory.mp3');
victory.volume = 0.5
let lowHP = new Audio('assets/audio/lowHP.mp3');
lowHP.volume = 1




$('#startScreen').on('click', function(){
    setTimeout(function(){$('#startScreen').hide()
    }, 900)
    setTimeout(function(){
        $('#dialDiv').removeClass('regle')
        $('#dialDiv').hide()
    }, 4000)
    musique.play()
})

//Effets produits a l'enfoncement du click (remise a ezéro de la zone de jeu)
$(".drag").on('mousedown', function(){    
    $('#dropZone').css({'background-image': 'none'})
    $('#dropZone').css({'opacity': '1'})
    $('#choixJoueur').removeClass('out')
    $('#choixOrdi').removeClass('out')
    $('#choixOrdi').removeClass('carapuce bulbizarre salameche')
    $('#pokemonOrdi').removeClass('carapuce bulbizarre salameche')
    $('#choixJoueur').removeClass('carapuce bulbizarre salameche')
    $('#pokemonJoueur').removeClass('carapuce bulbizarre salameche')   
})
$(".drag").on('mousedown', function(){
    console.log(`PV Joueur: ${pvJoueur} Pv Ordi: ${pvOrdi}`)
    $('#choixJoueur').removeClass('carapuce bulbizarre salameche')
    choixJoueur = $(this).attr('id');
    console.log(`${choixJoueur}`)
    // Choix Ordinateur
    choixOrdinateur = (Math.floor(Math.random() * 3) + 1)   
    if (choixOrdinateur === 1) {
        choixOrdinateur = 'bulbizarre'
    }
    else if (choixOrdinateur === 2) {
        choixOrdinateur = 'salameche'
    }
    else if (choixOrdinateur === 3) {
        choixOrdinateur = 'carapuce'
    }   
    console.log(`${choixOrdinateur}`)
})

//Lancement de la phase de jeu
$(function() {
    $('.drag').draggable({revert: true})
    $('#dropZone').droppable({
        drop: function(event, ui){ 
            $('#dropZone').css({'background-image': 'url(assets/img/pokeball.png)'})
            $('#dialDiv').addClass(`player${choixJoueur}`)
            $('#dialDiv').show()

            
            $('#choixOrdi').addClass(`${choixOrdinateur}`)
            $('#pokemonJoueur').addClass(`${choixJoueur}`)
            
            setTimeout(function(){
                $('#dropZone').css({'opacity': '0'}) 
                $('#choixJoueur').addClass(`${choixJoueur}`)
                $('#choixJoueur').addClass('enter')
                $('#hudJoueur').addClass('start') 
            }, 2000)
            setTimeout(function(){
                $('#hudOrdi').addClass('start')
                $('#choixOrdi').addClass('enter')
                $('#pokemonOrdi').addClass(`${choixOrdinateur}`)
                $('#dialDiv').addClass(`ordi${choixOrdinateur}`)
                $('#dialDiv').removeClass(`player${choixJoueur}`)
            }, 4000)            
            setTimeout(function(){
                resultat()
            }, 6000)
                
            console.log(`Ordinateur: ${choixOrdinateur} Joueur ${choixJoueur}`) 
        }
    })
})

//Détermination du vaiqueur
function resultat() {
    if (choixJoueur === 'bulbizarre' &&  choixOrdinateur === 'carapuce' ||
        choixJoueur === 'carapuce' &&  choixOrdinateur === 'salameche' ||
        choixJoueur === 'salameche' &&  choixOrdinateur === 'bulbizarre') {
                pvOrdi -= 1                
                if (pvOrdi === 0) {
                    musique.pause()
                    victory.play()      
                     //Dialogue & phase Attaque 2s
                        $('#dialDiv').removeClass(`ordi${choixOrdinateur}`)
                        $('#dialDiv').addClass(`attaque${choixJoueur}`)
                    //Animation attaque à insérer ici
                        setTimeout(function(){
                            $('#zoneAttaque').show()
                            $('#zoneAttaque').addClass(`winner${choixJoueur}`)
                        }, 1000)
                        setTimeout(function(){
                            $('#zoneAttaque').hide()
                            $('#zoneAttaque').removeClass(`winner${choixJoueur}`)
                        }, 1500)
                        setTimeout(function(){
                            pv()
                            $('#choixOrdi').removeClass('enter')
                            $('#choixOrdi').addClass('out')
                            $('#hudOrdi').addClass('out')
                        },2000)
                        setTimeout(function() {
                            //Sortie de ring Joueur
                            $('#dialDiv').removeClass(`attaque${choixJoueur}`)
                            $('#choixJoueur').removeClass('enter')
                            $('#choixJoueur').addClass('out')
                            $('#dialDiv').addClass('wonRestart')
                            $('#hudOrdi').removeClass('start')
                            $('#hudJoueur').removeClass('start')
                            $('#hudJoueur').addClass('out')
                            $('#dialDiv button').show()
                        }, 4000)
                } 
                else {
                    //Dialogue & phase Attaque 2s
                    $('#dialDiv').removeClass(`ordi${choixOrdinateur}`)
                    $('#dialDiv').addClass(`attaque${choixJoueur}`)
                    //Animation attaque à insérer ici
                    setTimeout(function(){
                        $('#zoneAttaque').show()
                        $('#zoneAttaque').addClass(`winner${choixJoueur}`)
                    }, 1000)
                    setTimeout(function(){
                        $('#zoneAttaque').hide()
                        $('#zoneAttaque').removeClass(`winner${choixJoueur}`)
                    }, 1500)
                    setTimeout(function(){
                        $('#zoneAttaque').addClass(`winner${choixJoueur}`)
                        $('#choixOrdi').removeClass('enter')
                        $('#choixOrdi').addClass('out')
                    },2000)
                    setTimeout(function() {
                        $('#zoneAttaque').hide()
                        $('#zoneAttaque').removeClass(`winner${choixJoueur}`)
                        pv()
                        //Sortie de ring Ordi
                        $('#dialDiv').removeClass(`attaque${choixJoueur}`)
                        $('#dialDiv').addClass('playerWins')
                    }, 4000)
                    setTimeout(function(){
                        $('#dialDiv').removeClass('playerWins')
                        $('#dialDiv').hide()
                        $('#dropZone').css({'background-image': 'none'})
                        $('#dropZone').css({'opacity': '1'})
                        $('#choixJoueur').removeClass('enter')
                        $('#choixJoueur').addClass('out')
                        $('#pokemonJoueur').removeClass('carapuce bulbizarre salameche') 
                        $('#pokemonOrdi').removeClass('carapuce bulbizarre salameche')
                    }, 8000)                
                }
    } else if (choixJoueur === choixOrdinateur) {
        $('#dialDiv').removeClass(`ordi${choixOrdinateur}`)
        $('#dialDiv').addClass('eq')
        //Sorties de ring
        setTimeout(function(){
            $('#choixJoueur').removeClass('enter')
            $('#choixJoueur').addClass('out')
            $('#choixOrdi').removeClass('enter')
            $('#choixOrdi').addClass('out')
            $('#dialDiv').removeClass('eq')
            $('#dialDiv').addClass('chooseNextEq')
        }, 4000)
        setTimeout(function(){
            $('#dialDiv').removeClass('chooseNextEq')
            $('#dialDiv').hide()
            $('#dropZone').css({'background-image': 'none'})
            $('#dropZone').css({'opacity': '1'}) 
            $('#pokemonJoueur').removeClass('carapuce bulbizarre salameche') 
            $('#pokemonOrdi').removeClass('carapuce bulbizarre salameche')
        }, 8000)
    } else {
            pvJoueur -= 1
            if (pvJoueur === 0) {
                //Dialogue phase Attaque
                $('#dialDiv').removeClass(`ordi${choixOrdinateur}`)
                $('#dialDiv').addClass(`attaque${choixOrdinateur}`)
                //Phase Attaque
                setTimeout(function(){
                    $('#zoneAttaque').show()
                    $('#zoneAttaque').addClass(`winner${choixOrdinateur}`)
                }, 1000)
                setTimeout(function(){
                    $('#zoneAttaque').hide()
                    $('#zoneAttaque').removeClass(`winner${choixOrdinateur}`)
                }, 1500)
                setTimeout(function(){
                    pv()
                    $('#choixJoueur').removeClass('enter')
                    $('#choixJoueur').addClass('out')
                },2000)
                setTimeout(function() {
                    //Sortie de ring Ordi
                    $('#dialDiv').removeClass(`attaque${choixOrdinateur}`)
                    $('#choixOrdi').removeClass('enter')
                    $('#choixOrdi').addClass('out')
                    $('#dialDiv').addClass('looseRestart')
                    $('#pokemonJoueur').removeClass('carapuce bulbizarre salameche') 
                    $('#pokemonOrdi').removeClass('carapuce bulbizarre salameche')
                    $('#hudOrdi').removeClass('start')
                    $('#hudOrdi').addClass('out')
                    $('#hudJoueur').removeClass('start')
                    $('#hudJoueur').addClass('out')
                    $('#dialDiv button').show()
                }, 4000)
            } 
            else {
                //Dialogue phase Attaque
                $('#dialDiv').removeClass(`ordi${choixOrdinateur}`)
                $('#dialDiv').addClass(`attaque${choixOrdinateur}`)
                //Phase Attaque
                setTimeout(function(){
                    $('#zoneAttaque').show()
                    $('#zoneAttaque').addClass(`winner${choixOrdinateur}`)
                }, 1000)
                setTimeout(function(){
                    $('#zoneAttaque').hide()
                    $('#zoneAttaque').removeClass(`winner${choixOrdinateur}`)
                }, 1500)
                setTimeout(function(){

                    $('#choixJoueur').removeClass('enter')
                    $('#choixJoueur').addClass('out')
                },2000)
                setTimeout(function() {
                    pv()
                    //Sortie de ring Ordi
                    $('#choixJoueur').removeClass('enter')
                    $('#choixJoueur').addClass('out')
                    $('#dialDiv').removeClass(`attaque${choixOrdinateur}`)
                    $('#dialDiv').addClass('ordiWins')
                }, 4000)
                setTimeout(function(){
                        $('#dialDiv').removeClass('ordiWins')
                        $('#dialDiv').hide()
                        $('#dropZone').css({'background-image': 'none'})
                        $('#dropZone').css({'opacity': '1'})
                        $('#choixOrdi').removeClass('enter')
                        $('#choixOrdi').addClass('out')
                        $('#pokemonJoueur').removeClass('carapuce bulbizarre salameche') 
                        $('#pokemonOrdi').removeClass('carapuce bulbizarre salameche') 
                }, 8000)
            }
    }  
}

function pv() {
    if (pvJoueur === 3) {
        $('#pvJoueur').css({'background-image': 'url(assets/img/interface/joueurPVfull.png)'})
    }
    if (pvJoueur === 2) {
        $('#pvJoueur').css({'background-image': 'url(assets/img/interface/joueurPV23.png)'})
    }
    else if (pvJoueur === 1) {
        lowHP.play()
        $('#pvJoueur').css({'background-image': 'url(assets/img/interface/joueurPV13.png)'})
    }
    else if (pvJoueur === 0) {
        lowHP.pause()
        $('#pvJoueur').css({'background-image': 'none'})
    }
    if (pvOrdi === 3) {
        $('#pvOrdi').css({'background-image': 'url(assets/img/interface/ordiPVfull.png)'})
    }
    if (pvOrdi === 2) {
        $('#pvOrdi').css({'background-image': 'url(assets/img/interface/ordiPV23.png)'})
    }
    else if (pvOrdi === 1) {
        $('#pvOrdi').css({'background-image': 'url(assets/img/interface/ordiPV13.png)'})
    }
    else if (pvOrdi === 0) {
        $('#pvOrdi').css({'background-image': 'none'})
    }
}
$('#yes').on('click', function(){
    victory.pause()  
    musique.play()
    pvJoueur = 3
    pvOrdi = 3
    pv()
    console.log(`PV Joueur: ${pvJoueur} PV Ordinateur: ${pvOrdi}`)
    $('#dialDiv button').hide()
    $('#dialDiv').removeClass(`wonRestart looseRestart`)
    $('#dialDiv').addClass(`regle`)
    $('#dropZone').css({'background-image': 'none'})
    $('#dropZone').css({'opacity': '1'})
    $('#hudOrdi').removeClass('out')
$('#hudJoueur').removeClass('out')
    setTimeout(function(){
        $('#dialDiv').hide()
    }, 3000)
})
$('#no').on('click', function(){
    window.close();
})