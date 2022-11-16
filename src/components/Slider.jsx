import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase.config'
import { Navigation, Pagination, Scrollbar, A11y, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css/effect-creative";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';
import "swiper/css/effect-fade";
import Spinner from './Spinner';


function Slider() {
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchListings = async () => {
            const listingsRef = collection(db, 'listings');
            const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5));
            const querySnap = await getDocs(q);

            let listings = [];

            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                })
            });
            //console.log(listings);
            setListings(listings);
            setLoading(false);
        }

        fetchListings();
    }, []);

    if (loading) {
        return <Spinner />
    }

    if (listings.length === 0) {
        return <></>;
    }
    return (
        listings && (
            <>
                <p className='exploreHeading'>Recommended</p>

                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}
                    slidesPerView={1}
                    effect={"fade"}
                    navigation={true}
                    a11y={true}
                    pagination={{ clickable: true }}
                >
                    {listings.map(({ data, id }) => (
                        <SwiperSlide style={{ height: 'auto', maxHeight: '550px' }} key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
                            <img
                                style={{ width: '100%', height: '100%', display: 'block', borderRadius: '1.5rem' }}
                                src={data.imgUrls}
                                alt='{listing.title}'
                            />
                            <p className='swiperSlideText'>{data.name}</p>
                            <p className='swiperSlidePrice'>
                                ${
                                    //eslint-disable-next-line
                                    data.discountedPrice ?? data.regularPrice
                                } {data.type === 'rent' && '/ month'}
                            </p>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </>
        )
    )
}

export default Slider;