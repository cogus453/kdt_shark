$(document).ready(function () {
    
    var rssFeedUrl = 'https://threatpost.com/feed/';
    
    $.ajax({
        url: rssFeedUrl,
        dataType: 'xml',
        success: function (data) {
            const items = data.getElementsByTagName("item");

            if (items.length === 0) {
                return;
            }

            const numItemsToShow = 4;
            const numItems = Math.min(numItemsToShow, items.length);

            let htmlContent = "";

            for (let i = 0; i < numItems; i++) {
                const item = items[i];
                const title = item.getElementsByTagName("title")[0].textContent;
                const link = item.getElementsByTagName("link")[0].textContent;
                const description = item.getElementsByTagName("description")[0].textContent;
                const mediaContent = item.getElementsByTagName("media:content");
                const image = (mediaContent.length && mediaContent[0].getAttribute('url')) ? mediaContent[0].getAttribute('url') : "{% static 'blog/images/pic04.jpg' %}";

                const itemHtml = `
                    <div class="feature">
                        <div class="image rounded">
                            <img src="${image}" alt="" width="169" height="169">
                        </div>
                        <div class="content">
                            <header>
                                <h4>${title}</h4>
                                <p><a href="${link}" target="_blank">${link}</a></p>
                            </header>
                            <p>${description}</p>
                        </div>
                    </div>
                `;

                htmlContent += itemHtml;
            }

            document.getElementById("rss-feed-container").innerHTML = htmlContent;
        }
    });
});
