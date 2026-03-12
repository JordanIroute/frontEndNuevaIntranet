'use client';
import { htmlAttributes, WidgetContext } from "@progress/sitefinity-nextjs-sdk";
import React, { useEffect, useState, useRef } from "react";
import { ModalEntity } from "./modal.entity";
import "./modal.css";
import { ImageItem,RestClient,RestSdkTypes } from '@progress/sitefinity-nextjs-sdk/rest-sdk';

export function ModalWidget(props: WidgetContext<ModalEntity>) {
    let dataAttributes = htmlAttributes(props);
    const {LinkButton,Content,Image} = props.model?.Properties ;
    const [images, setImages] = useState<ImageItem | null>(null);
    const [show, setShow] = useState(true);
    
    const { isEdit } = props.requestContext;
    const handleClose = () => setShow(false);
 
    const fetchContent = async () => {
        try {
            let imagen:ImageItem | null = null;
            if (Image?.Id){
                    try {
                                imagen = await RestClient.getItemWithFallback<ImageItem>({
                                type: RestSdkTypes.Image,
                                id: Image.Id.toString()
                            });
                        } catch (error) {
                            console.warn('Error loading image:', error);
                        }
                    }
                    setImages(imagen);
                } catch (error) {
            console.error('Error fetching items:', error);
        }
    };
     
    useEffect(() => {
        // 1. Manejo del modal
        if (isEdit) {
            setShow(false);
        } else {
            setShow(true);
        }
    }, [isEdit]);

    useEffect(() => { fetchContent();  }, []);

    const isClassOverlay = isEdit ? "" : "custom-modal-overlay";
    if (!show  && !isEdit) return null;

    return (
        <div className={isClassOverlay}{...dataAttributes}>
            <div className="custom-modal-container">
                <button
                    className="custom-modal-close-btn"
                    onClick={handleClose}
                    aria-label="Cerrar modal"
                >
                    <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                        <path d="M11 1L1 11M1 1L11 11" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>

                <div className="custom-modal-content">
                    <div className="custom-modal-image-wrapper">
                        <img
                            src={images?.Url}
                            alt={images?.Title || 'Imagen del modal'}
                            className="custom-modal-image"
                        />

                    </div>

                    <div className="custom-modal-body">
                        {LinkButton?.href && (
                            <a
                                href={LinkButton?.href}
                                className="custom-modal-btn"
                                target={LinkButton?.target || '_self'}
                                rel={LinkButton?.target === '_blank' ? 'noopener noreferrer' : undefined}
                                onClick={handleClose} >
                                {LinkButton?.text || "Ver más"}
                            </a>
                        )}

                        {Content &&( <p className="custom-modal-text"> {Content} </p>  )}
                          
                    </div>


                </div>
            </div>
        </div>
    );
}