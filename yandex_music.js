function trackDownloaded(textField, trackTitle){
    async function fetchAsync (url) {
        let response = await fetch(url);
        let data = await response.json();
        
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
        
        // Поиск нашел хотя бы один трек
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
        
        // Поиск не нашел треков
        else{
            textField.innerHTML = "<span style='font-size: 18px'> Для трека <b>" + trackTitle + "</b> нет текста в API.</span>" + "<br> </br>";
        }
        
        // Поиск нашел только один трек
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

// Потом нужно будет убрать функцию trackDownloaded и переписать эту функцию чтобы она адекватно работала.
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
            console.error("error: ", error);
        }
    })
    .catch(error => console.error("error: ", error));
}

// Ожидание готовности Yandex.Music externalAPI
window.addEventListener("load", function() {
    if (typeof externalAPI !== "undefined") {
        prepareTextField();
        // Следим за сменой треков
        externalAPI.on(externalAPI.EVENT_TRACK, function() {
            const track = externalAPI.getCurrentTrack();

            if (track) {
                // если трек скачанный
                if (track.cover === undefined){
                    const trackTitle = generateTrackTitle(track);

                    // show_downloaded_lyrics(trackTitle);

                    trackDownloaded(document.querySelector('.sidebar__ads'), trackTitle);
                }
                else{
                    if (document.querySelector('.lyrics-holder-container') !== null){
                        document.querySelector('.lyrics-holder-container').remove()
                    }

                    const trackId = track.link.split('/')[4]
                    const trackTitle = generateTrackTitle(track);
                    
                    show_lyrics(trackId, trackTitle);
                }
            }
        });
    }
});


function generateTrackTitle(track){
    // Генерация названия трека
    // Фортам: Название - Автор
    // Уберает лишние слова, подпись расширения и тд.
    // Работает как для скачанных, так и для нескачанных

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
