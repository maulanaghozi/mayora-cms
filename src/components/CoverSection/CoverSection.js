import React,{ useEffect, useState } from "react";
import classNames from "classnames";
import { BlueFacebook, BlueInstagram, BlueTwitter } from "../../assets/image";
import style from "./CoverSection.module.scss"
import { getCoverPic } from "../../utility/utility";
import { http } from "../../utility/http";

export default function CoverSection({ data, className, isTalent}) {
    const [castingCount, setCastingCount] = useState(null);

    useEffect(() => {
        const params = {
            method: 'GET',
        }

        if (isTalent) {
            params.path = `profiles/talent/statistic/${data.user_id}`
        } else {
            params.path = 'posting/casting/search'
            params.query = {
                page: 1,
                rows: 10,
                recruiter_id: data.user_id
            }
        }

        http(params)
        .then(result => {
            if (result && result.code === 'success') {
                if (isTalent) {
                    setCastingCount(result.payload.casting_count);
                } else {
                    setCastingCount(result.payload.total_rows)
                }
            }
        })
    }, [])
    return (
        <div className={className}>
            <img 
                src={getCoverPic(data.cover_pic_url)} 
                alt="cover pic" 
                className={classNames(style.cover, {[style.is_talent] : isTalent})} 
            />
            <section className={style.amount_section}>
                <div className={style.content_flex}>
                    <p className={style.blue_bold}>{castingCount}</p>
                    <p className={style.text}>{isTalent ? "casting" : "job post"}</p>
                </div>
                {/* <div className={style.content_flex}>
                    <p className={style.blue_bold}>{data.followers ? data.followers : 0}</p>
                    <p className={style.text}>followers</p>
                </div> */}
                {/* <div className={style.content_flex}>
                    <p className={style.blue_bold}>{data.following ? data.following : 0}</p>
                    <p className={style.text}>following</p>
                </div> */}
            </section>
            <section className={style.social_section}>
                <span>Socials</span>
                <div className={style.social_media}>
                    <a
                        href={
                            (
                                data.social_media &&
                                data.social_media.facebook_url
                            ) ?
                            data.social_media.facebook_url :
                            'https://facebook.com/'
                        }
                        target={'blank'}
                    >
                        <BlueFacebook width={25} height={25}/>
                    </a>
                    <a
                        href={
                            (
                                data.social_media &&
                                data.social_media.instagram_url
                            ) ?
                            data.social_media.instagram_url :
                            'https://instagram.com/'
                        }
                        target={'blank'}
                    >
                        <BlueInstagram width={25} height={25}/>
                    </a>
                    <a
                        href={
                            (
                                data.social_media &&
                                data.social_media.twitter_url
                            ) ?
                            data.social_media.twitter_url :
                            'https://twitter.com/'
                        }
                        target={'blank'}
                    >
                        <BlueTwitter width={25} height={25}/>
                    </a>
                </div>
            </section>
        </div>
    )
}