import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { ShareSocial } from 'react-share-social';

const CompartirRedes = ({ shareData }) => {
    const style = {
        root: {
            background: 'linear-gradient(45deg, #539dc2 30%, #2a5c7a 90%)',
            borderRadius: 3,
            border: 0,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: '#182b39',
        },
        copyContainer: {
            border: '1px solid blue',
            background: 'rgb(0,0,0,0.7)',
        },
        title: {
            color: 'aquamarine',
            fontStyle: 'italic',
        },
    };



    useEffect(() => {
        const head = document.head;

        const existingMetaTags = head.querySelectorAll("[property^='og:']");
        existingMetaTags.forEach((tag) => head.removeChild(tag));

        const ogTitle = document.createElement("meta");
        ogTitle.setAttribute("property", "og:title");
        ogTitle.setAttribute("content", shareData.title);
        head.appendChild(ogTitle);

        const ogDescription = document.createElement("meta");
        ogDescription.setAttribute("property", "og:description");
        ogDescription.setAttribute("content", shareData.description);
        head.appendChild(ogDescription);

        const ogImage = document.createElement("meta");
        ogImage.setAttribute("property", "og:image");
        ogImage.setAttribute("content", shareData.imageUrl);
        head.appendChild(ogImage);

        const ogUrl = document.createElement("meta");
        ogUrl.setAttribute("property", "og:url");
        ogUrl.setAttribute("content", shareData.link);
        head.appendChild(ogUrl);
    }, []);

    return (
        <div style={style.root}>

            {console.log('shareData.title en Compartir', shareData.title)}
            {console.log('shareData.desc en Compartir', shareData.description)}

            <Helmet>
                <meta property="og:title" content={shareData.title} />
                <meta property="og:description" content={shareData.description} />
                <meta property="og:image" content={shareData.imageUrl} />
                <meta property="og:url" content={shareData.link} />
            </Helmet>

            <ShareSocial
                url={shareData.link}
                socialTypes={['facebook', 'linkedin', 'reddit', 'twitter', 'whatsapp', 'telegram']}
                onSocialButtonClicked={data => console.log(data)}
                description={shareData.description}
                image={shareData.imageUrl}
                title={shareData.title}
                style={style}
            />
        </div>
    );
};

export default CompartirRedes;
