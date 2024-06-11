// function deleteUnnecessaryContent(){
//     if (document.querySelector('.teaser__content') !== null){
//         document.querySelector('.teaser__content').remove();
//     }
// }

// function trackDownloaded(textField){
//     async function fetchAsync (url) {
//         let response = await fetch(url);
//         let data = await response.json();
//         results = [];

//         let originalAuthors = []
//         if (data.result.tracks !== undefined){
//             for (res of data.result.tracks.results){
//                 if (res.lyricsInfo.hasAvailableTextLyrics && res.lyricsAvailable){
//                     results.push(res.id);
//                     originalAuthors.push([res.title, res.artists[0].name]);
//                 }
//             }
//         }
//         texts = []
//         for (r of results){
//             let response1 = await fetch("https://api.music.yandex.net/tracks/" + r + "/supplement");
//             let data1 = await response1.json();
//             if (data1['result']['lyrics'] !== undefined){
//                 texts.push(data1['result']['lyrics']['fullLyrics'])
//             }
//         }

//         if (document.querySelector('.lyrics-holder-container') !== null){
//             document.querySelector('.lyrics-holder-container').remove()
//         }

//         let divContainer = document.createElement('div')
//         divContainer.classList.add("lyrics-holder-container");
//         document.querySelector('.teaser').appendChild(divContainer);
        
//         // Текст возможно есть в YandexAPI
//         if (texts.length != 0){
//             let leftbtn = document.createElement('button');
//             leftbtn.style.padding = '15px';
//             leftbtn.innerHTML = '<';
//             leftbtn.style.border = 'None';
//             leftbtn.style.outline = 'None';
//             leftbtn.style.background = 'None';
//             leftbtn.style.fontSize = '30px';
//             leftbtn.style.color = '#fff';
//             divContainer.appendChild(leftbtn);

//             let pageSpan = document.createElement('span');
//             let Lcounter = 0
//             pageSpan.innerHTML = Lcounter + 1;
//             pageSpan.style.padding = '30px';
//             pageSpan.style.fontSize = '25px';
//             divContainer.appendChild(pageSpan);

//             let rightbtn = document.createElement('button');
//             rightbtn.style.padding = '15px';
//             rightbtn.innerHTML = '>';
//             rightbtn.style.border = 'None';
//             rightbtn.style.outline = 'None';
//             rightbtn.style.background = 'None';
//             rightbtn.style.fontSize = '30px';
//             rightbtn.style.color = '#fff';
//             divContainer.appendChild(rightbtn);
//             lyricsChanger();
//             function lyricsChanger(){
//                 if (Lcounter > texts.length - 1){
//                     Lcounter = 0;
//                 }
//                 if (Lcounter < 0){
//                     Lcounter = texts.length - 1
//                 }
//                 pageSpan.innerHTML = Lcounter + 1;

//                 textField.innerHTML = "<span style='font-size: 22px; font-weight: bold'>" + document.title.split(".")[0] + " (" + originalAuthors[Lcounter][1] + " - " + originalAuthors[Lcounter][0] + ")" + "</span>" + "<br> </br>" + texts[Lcounter].replaceAll('\n', '<br> </br>');
//             }

//             rightbtn.onclick = function(){
//                 Lcounter += 1;
//                 lyricsChanger();
//             }

//             leftbtn.onclick = function(){
//                 Lcounter -= 1;
//                 lyricsChanger();
//             }
//         }
        
//         // Текста нет в YandexAPI
//         else{
//             textField.innerHTML = "";

//             let pageSpan1 = document.createElement('span');
//             let pageSpan2 = document.createElement('span');
//             let br1 = document.createElement('br');
//             let br2 = document.createElement('br');
//             pageSpan1.innerHTML += "Для песни " + document.title.split('.')[0];
//             pageSpan1.style.padding = '30px';
//             pageSpan1.style.fontSize = '15px';
//             pageSpan2.innerHTML += "в Yandex API текста нет";
//             pageSpan2.style.padding = '30px';
//             pageSpan2.style.fontSize = '15px';
//             divContainer.appendChild(pageSpan1);
//             divContainer.appendChild(br1);
//             divContainer.appendChild(br2);
//             divContainer.appendChild(pageSpan2);
//         }

//         if (texts.length == 1){
//             divContainer.remove();
//         }
//     }
//     if (document.title.indexOf('-') > -1){
//         fetchAsync("https://api.music.yandex.net/search?text=" + document.title.split(" - ")[0] + "&page=0&type=all&nococrrect=false");
//     }
//     else{
//         fetchAsync("https://api.music.yandex.net/search?text=" + document.title.split(".")[0] + "&page=0&type=all&nococrrect=false");
//     }
// }

// function trackFromYandexMusic(textField){
//     if (document.querySelector('.lyrics-holder-container') !== null){
//         document.querySelector('.lyrics-holder-container').remove()
//     }

//     let trackId = document.querySelector(".track__name-innerwrap").children[0].getAttribute('href').split('/')[4];

//     async function fetchAsync (url) {
//         let response = await fetch(url);
//         let data = await response.json();
        
//         // Трек есть в YandexAPI
//         if (data['result']['lyrics'] !== undefined){
//             lyrics = data['result']['lyrics']['fullLyrics'];
//             textField.innerHTML = "<span style='font-size: 22px; font-weight: bold'>" + document.title + "</span>" + "<br> </br>" + lyrics.replaceAll('\n', '<br> </br>');
//         }
        
//         // Трека нет в YandexAPI
//         else{
//             if (document.querySelector('.lyrics-holder-container') !== null){
//                 document.querySelector('.lyrics-holder-container').remove()
//             }

//             let divContainer = document.createElement('div')
//             divContainer.classList.add("lyrics-holder-container");
//             document.querySelector('.teaser').appendChild(divContainer);


//             textField.innerHTML = "";

//             let pageSpan1 = document.createElement('span');
//             let pageSpan2 = document.createElement('span');
//             let br1 = document.createElement('br');
//             let br2 = document.createElement('br');
//             pageSpan1.innerHTML += "Для песни " + document.title;
//             pageSpan1.style.padding = '30px';
//             pageSpan1.style.fontSize = '15px';
//             pageSpan2.innerHTML += "в Yandex API текста нет";
//             pageSpan2.style.padding = '30px';
//             pageSpan2.style.fontSize = '15px';
//             divContainer.appendChild(pageSpan1);
//             divContainer.appendChild(br1);
//             divContainer.appendChild(br2);
//             divContainer.appendChild(pageSpan2);
//         }
//     }
//     fetchAsync("https://api.music.yandex.net/tracks/" + trackId + "/supplement");
// }

// function createShowBtn(textField){
//     reqBtn = document.createElement('button');
//     reqBtn.classList.add('send-req-btn');
//     reqBtn.style.padding = '15px';
//     if (textField.style.opacity == '0'){
//         reqBtn.innerHTML = 'Show Lyrics';
//     }
//     else{
//         reqBtn.innerHTML = 'Hide Lyrics';
//     }
//     reqBtn.style.verticalAlign = 'text-bottom';
//     reqBtn.style.fontSize = '15px';
//     reqBtn.style.color = '#fff';
//     reqBtn.style.outline = 'None';
//     reqBtn.style.border = 'None';
//     reqBtn.style.cursor = 'Pointer';
//     reqBtn.style.background = 'None';
//     document.querySelector('.head-kids__user').insertBefore(reqBtn, document.querySelector('.plus-points.head-kids__plus-points'));

//     reqBtn.onclick = function(){
//         if (reqBtn.innerHTML == 'Hide Lyrics'){
//             textField.style.opacity = '0';
//             textField.style.cursor = 'default';
//             textField.style.userSelect = 'None';
//             document.querySelector('.sidebar__under').style.overflow = 'hidden';
//             reqBtn.innerHTML = 'Show Lyrics';

//             if (document.querySelector('.lyrics-holder-container') !== null){
//                 document.querySelector('.lyrics-holder-container').style.opacity = '0';
//                 document.querySelector('.lyrics-holder-container').style.cursor = 'default';
//             }
//         }
//         else{
//             reqBtn.innerHTML = 'Hide Lyrics'
//             textField.style.opacity = null;
//             textField.style.cursor = null;
//             textField.style.userSelect = null;
//             document.querySelector('.sidebar__under').style.overflow = null;

//             if (document.querySelector('.lyrics-holder-container') !== null){
//                 document.querySelector('.lyrics-holder-container').style.opacity = null;
//                 document.querySelector('.lyrics-holder-container').style.cursor = null;
//             }
//         }
//     }
// }

// function createScrollBtn(){        
//         scrollBtn = document.createElement('button');
//         scrollBtn.classList.add('scroll-btn');
//         scrollBtn.style.padding = '15px';
//         scrollBtn.style.verticalAlign = 'text-bottom';
//         scrollBtn.innerHTML = 'Start Scrolling';
//         scrollBtn.style.fontSize = '15px';
//         scrollBtn.style.color = '#fff';
//         scrollBtn.style.outline = 'None';
//         scrollBtn.style.border = 'None';
//         scrollBtn.style.cursor = 'Pointer';
//         scrollBtn.style.background = 'None';
//         document.querySelector('.head-kids__user').insertBefore(scrollBtn, document.querySelector('.send-req-btn'));
//         let counter = 0;
//         scrollBtn.onclick = function(){
//             counter += 1;
//             if (counter == 1){
//                 scrollBtn.innerHTML = 'Stop Scrolling';
//                 pageScroll();
//                 function pageScroll() {
//                     let progress = document.querySelector('.progress__bar.progress__text').getAttribute('data-played-time') / document.querySelector('.progress__bar.progress__text').getAttribute('data-duration');
//                     let max_height = document.querySelector('.sidebar__ads').offsetHeight * 0.69;

//                     document.querySelector('.sidebar__under').scrollTo(0, progress * max_height);
//                     scrolldelay = setTimeout(pageScroll,10);
//                 }
//             }
//             else if (counter == 2){
//                 counter = 0;
//                 scrollBtn.innerHTML = 'Start Scrolling';
//                 clearTimeout(scrolldelay);
//             }
//         }
//     }

// function createNecessaryContent(textField){
//     if (document.querySelector('button.send-req-btn') === null){
//         createShowBtn(textField);
//     }

//     /*if (document.querySelector('button.scroll-btn') === null){
//         createScrollBtn();
//     }*/
// }

// function start(){
//     let textField = document.querySelector('.sidebar__ads');
//     textField.style.fontSize = '15px';
//     textField.style.padding = '10px 30px';
//     textField.style.paddingBottom = '50px';
//     textField.style.fontFamily = 'YSTextRegular,Arial,Helvetica,sans-serif';
    
//     deleteUnnecessaryContent();
    
//     // OBSERVER
//     const title = document.querySelector("title");

//     const observer = new MutationObserver(() => {
//         setTimeout(function(){
//             deleteUnnecessaryContent();
//             createNecessaryContent(textField);
        
//             titleText = title.innerHTML;
//             if (document.querySelector('.teaser__content') !== null){
//                 document.querySelector('.teaser__content').remove();
//             }

//             // Трек скачанный
//             if (titleText.indexOf(".mp3") !== -1){
//                 trackDownloaded(textField);
//             }
//             // Песня из яндекс музыки и это не главная странцица
//             else if (titleText.indexOf("—") !== -1 && titleText.split[0] !== "Яндекс" && titleText.split[1] !== "Музыка"){
//                 trackFromYandexMusic(textField);
//             }
//         }, 500);
//     });

//     observer.observe(title, { childList: true });
    
//     ////// OBSERVER END
// }

// setTimeout(function(){
//     start();
// }, 3000);

// let LAST_SONG = null;

// new MutationObserver(function(mutations) {
//     setTimeout(()=>{
//         let song_title = getCurrentSong();
        
//         if (LAST_SONG === null){
//             LAST_SONG = song_title;
//             loadSong(song_title);
//             // console.log("Поменялась");
//         }
        
//         // Делаем если песня сменилась
//         if (LAST_SONG !== song_title){
//             LAST_SONG = song_title;
//             loadSong(song_title);
//             // console.log("Поменялась");
//         }
//         // Делаем если песня не сменилась
//         else{
//             // console.log('Не поменялась');
//         }

//     }, 750);
// }).observe(
//     document.querySelector('title'),
//     { subtree: true, characterData: true, childList: true }
// );


// function getCurrentSong(){
//     let song = null;
//     let artist = null;
//     try{
//         song = document.querySelector('div.track__name').children[0].children[0].children[0].innerHTML;
//         artist = document.querySelector('div.track__artists').children[0].children[0].innerHTML;
//     }
//     catch(error){
//         // console.error("error: ", error);
//     }

//     let song_title = song;
//     if (song_title.indexOf(' - ') !== -1){
//         song_title = song_title.split(' - ')[0]
//     }
//     if (song_title.indexOf(' (Nightcore)') !== -1){
//         song_title = song_title.replace(' (Nightcore)', '');
//     }
//     if (artist !== null) song_title += ' - ' + artist;
//     song_title = song_title.replace('.mp3', '');

//     // console.log(song_title);

//     return song_title
// }

function trackDownloaded(textField, trackTitle){
    async function fetchAsync (url) {
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        results = [];

        let originalAuthors = []
        if (data.result.tracks !== undefined){
            for (res of data.result.tracks.results){
                if (res.lyricsInfo.hasAvailableTextLyrics && res.lyricsAvailable){
                    results.push(res.id);
                    originalAuthors.push([res.title, res.artists[0].name]);
                }
            }
        }
        texts = []
        for (r of results){
            let response1 = await fetch("https://api.music.yandex.net/tracks/" + r + "/supplement");
            let data1 = await response1.json();
            if (data1['result']['lyrics'] !== undefined){
                texts.push(data1['result']['lyrics']['fullLyrics'])
            }
        }

        if (document.querySelector('.lyrics-holder-container') !== null){
            document.querySelector('.lyrics-holder-container').remove()
        }

        let divContainer = document.createElement('div')
        divContainer.classList.add("lyrics-holder-container");
        document.querySelector('.teaser').appendChild(divContainer);
        
        // Текст возможно есть в YandexAPI
        if (texts.length != 0){
            let leftbtn = document.createElement('button');
            leftbtn.style.padding = '15px';
            leftbtn.innerHTML = '<';
            leftbtn.style.border = 'None';
            leftbtn.style.outline = 'None';
            leftbtn.style.background = 'None';
            leftbtn.style.fontSize = '30px';
            leftbtn.style.color = '#fff';
            divContainer.appendChild(leftbtn);

            let pageSpan = document.createElement('span');
            let Lcounter = 0
            pageSpan.innerHTML = Lcounter + 1;
            pageSpan.style.padding = '30px';
            pageSpan.style.fontSize = '25px';
            divContainer.appendChild(pageSpan);

            let rightbtn = document.createElement('button');
            rightbtn.style.padding = '15px';
            rightbtn.innerHTML = '>';
            rightbtn.style.border = 'None';
            rightbtn.style.outline = 'None';
            rightbtn.style.background = 'None';
            rightbtn.style.fontSize = '30px';
            rightbtn.style.color = '#fff';
            divContainer.appendChild(rightbtn);
            lyricsChanger();
            function lyricsChanger(){
                if (Lcounter > texts.length - 1){
                    Lcounter = 0;
                }
                if (Lcounter < 0){
                    Lcounter = texts.length - 1
                }
                pageSpan.innerHTML = Lcounter + 1;

                textField.innerHTML = "<span style='font-size: 22px; font-weight: bold'>" + trackTitle.split(' - ')[0] + " (" + originalAuthors[Lcounter][1] + " - " + originalAuthors[Lcounter][0] + ")" + "</span>" + "<br> </br>" + texts[Lcounter].replaceAll('\n', '<br> </br>');
            }

            rightbtn.onclick = function(){
                Lcounter += 1;
                lyricsChanger();
            }

            leftbtn.onclick = function(){
                Lcounter -= 1;
                lyricsChanger();
            }
        }
        
        // Текста нет в YandexAPI
        else{
            textField.innerHTML = "<span style='font-size: 18px'> Для трека <b>" + trackTitle + "</b> нет текста в API.</span>" + "<br> </br>";
        }

        if (texts.length == 1){
            divContainer.remove();
        }
    }
    fetchAsync("https://api.music.yandex.net/search?text=" + trackTitle.split(' - ')[0] + "&page=0&type=all&nococrrect=false");
}

function prepareTextField(){
    let textField = document.querySelector('.sidebar__ads');
    textField.style.fontSize = '15px';
    textField.style.padding = '10px 30px';
    textField.style.paddingBottom = '50px';
    textField.style.fontFamily = 'YSTextRegular,Arial,Helvetica,sans-serif';
}

// function show_downloaded_lyrics(trackTitle){
//     fetch("https://api.music.yandex.net/search?text=" + trackTitle + "&page=0&type=all")
//     .then(response => response.json())
//     .then((data) => {
//         try{
//             const tracks = data['result']['tracks']['results'].slice(0, 10);
//             console.log(tracks);
//         }
//         catch(error){
//             // console.error("error: ", error);
//         }
//     })
//     .catch(error => console.error("error: ", error));
// }

function show_lyrics(trackId, trackTitle){
    fetch("https://api.music.yandex.net/tracks/" + trackId + "/supplement")
    .then(response => response.json())
    .then((data) => {
        try{
            // const data = data['result']['tracks']['results'].slice(0, 10);
            console.log(data);
            // Трек есть в YandexAPI
            let textField = document.querySelector('.sidebar__ads');
            if (data['result']['lyrics'] !== undefined){
                let lyrics = data['result']['lyrics']['fullLyrics'];
                textField.innerHTML = "<span style='font-size: 22px; font-weight: bold'>" + trackTitle + "</span>" + "<br> </br>" + lyrics.replaceAll('\n', '<br> </br>');
            }
            else{
                textField.innerHTML = "<span style='font-size: 18px'> Для трека <b>" + trackTitle + "</b> нет текста в API.</span>" + "<br> </br>";
            }
        }
        catch(error){
            // console.error("error: ", error);
        }
    })
    .catch(error => console.error("error: ", error));
}

// Wait for the Yandex.Music external API to be ready
window.addEventListener("load", function() {
    if (typeof externalAPI !== "undefined") {
        prepareTextField();
        // Listen for changes in the track
        externalAPI.on(externalAPI.EVENT_TRACK, function() {
            const track = externalAPI.getCurrentTrack();

            if (track) {
                console.log(track);
                // скачанный
                if (track.cover === undefined){
                    // console.log("я скачанный");
                    const trackTitle = generateTrackTitle(track);
                    console.log(trackTitle);
                    // show_downloaded_lyrics(trackTitle);
                    trackDownloaded(document.querySelector('.sidebar__ads'), trackTitle);
                }
                // не скачанный
                else{
                    // console.log("я не скачанный");
                    const trackId = track.link.split('/')[4]
                    const trackTitle = generateTrackTitle(track);
                    // console.log(trackId);
                    show_lyrics(trackId, trackTitle);
                }
            }
        });
    }
});


function generateTrackTitle(track){
    let artists = [];
    for (let artist of track.artists){
        if (artist.title !== 'Zen - Kun')
            artists.push(artist.title);
    }
    let title = track.title.replace('.mp3', '').replace(' (Nightcore)', '').replace(' - Nightcore', '');
    if (artists.length !== 0){
        title += ' - ' + artists.join(', ')
    }
    return title;
}




