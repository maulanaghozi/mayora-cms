import React from 'react'
import Select from 'react-select'
import { ReactComponent as PlusIcon } from '../../assets/plus.svg'
import { container, tagline, upload, upload_file, addButton, note, footer, btnPublish } from './UploadBrief.module.scss'

export default function UploadBrief(props) {
    return (
        <div className={container}>
            <p className={tagline}>Upload Brief</p>
            <div className={upload}>
                <p>Thumbnail :</p>
                <label>
                    <input type={'file'} className={upload_file} />
                    <div className={addButton}>
                        <PlusIcon />
                        <p>Add</p>
                        <p>Thumbnail</p>
                    </div>
                    <p className={note}>*ukuran image akan otomatis terpotong menjadi 335 x 125</p>
                </label>
            </div>
            <div className={upload}>
                <p>Video :</p>
                <label>
                    <input type={'file'} className={upload_file} />
                    <div className={addButton}>
                        <PlusIcon />
                        <p>Add</p>
                        <p>Video</p>
                    </div>
                    <p className={note}>*mp4 file</p>
                </label>
            </div>
            <div className={upload}>
                <div>
                    <p>Max Casting Video :</p>
                    <p className={note}>*untuk talent</p>
                </div>
                <label>
                    <input type={'file'} className={upload_file} />
                </label>
            </div>
            <div className={footer}>
                <button className={btnPublish}>publish</button>
            </div>
        </div>
    )
}