import { HiX } from "react-icons/hi";
import React, { useRef, useState } from 'react'
import { BsFillHeartFill } from "react-icons/bs";



export default function Gallery({ filteredItems, setFilteredItems}) {
    const [model, setModel] = useState(false)
    const [temp, setTemp] = useState('')

    // picture modal 
    const getPhoto = src => {
        setTemp(src)
        setModel(true)
        console.log('opened');
    }


    // save reference for dragitem and dragOver item
    const dragItem = useRef(null)
    const dragOverItem = useRef(null)



    // handle drag sorting 
    const handleSort = () => {
        let _pictures = [...filteredItems]
        const dragItemContent = _pictures.splice(dragItem.current, 1)[0]
        _pictures.splice(dragOverItem.current, 0, dragItemContent)
        dragItem.current = null
        dragOverItem.current = null
        setFilteredItems(_pictures)
    }



























    return (
        <>
            <div className={model ? 'model open' : 'model'}>
                <img src={temp} alt={temp} />
                <HiX onClick={() => setModel(false)} />
            </div>
            <div className='gallery' >
                {
                    filteredItems.map((picture, index) => {
                        return (
                            <div onClick={() => getPhoto(picture.src)}
                                draggable
                                onTouchStart={e => dragItem.current = index}
                                onTouchMove={e => dragOverItem.current = index}
                                onTouchEnd={handleSort}
                                onDragStart={(e) => dragItem.current = index}
                                onDragEnter={(e) => dragOverItem.current = index}
                                onDragEnd={handleSort}
                                onDragOver={e => e.preventDefault()}
                                className='pics relative' key={picture.id}>
                                <img src={picture.src} alt={picture.id} />
                                <BsFillHeartFill size={25} className={`absolute top-4 right-4 ${picture.tag === "top-rated"? "text-purple-900" : "text-rose-900"} `} />
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
