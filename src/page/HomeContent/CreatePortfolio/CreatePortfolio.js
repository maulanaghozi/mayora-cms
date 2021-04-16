import React, { useState, useEffect } from 'react';
import useHeader from '../../../hooks/useHeader/useHeader';

import { http } from '../../../utility/http';

import PageTitle from '../../../components/PageTitle/PageTitle';
import PortfolioForm from '../../../components/PortfolioForm/PortfolioForm';
import PortfolioUplaod from '../../../components/PortfolioUpload/PortfolioUpload';

import { container, detail } from './CreatePortfolio.module.scss';
import { Redirect, Prompt } from 'react-router-dom';
import { useAlert } from 'react-alert';

export default function CreatePortfolio(props) {
  const [title, setTitle] = useState(props.title || '');
  const [user_id, setUserId] = useState(props.user_id || null);
  const [withDescription, setWithDescription] = useState(true);
  const [description, setDescription] = useState(props.description || '');
  const [video_url, setVideoUrl] = useState(props.video_url || '');
  const [thumbnail, setThumbnail] = useState(props.thumbnail || null);
  const [isModified, setIsModified] = useState(null);
  const [back, setBack] = useState(false);
   
  const createCriteria = {
    title,
    user_id,
    withDescription,
    description,
    video_url,
    thumbnail
  }

  const setter = {
    title: setTitle,
    user_id: setUserId,
    withDescription: setWithDescription,
    description: setDescription,
    video_url: setVideoUrl,
    thumbnail: setThumbnail
  }

  const setCreateCriteria = newCriteria => {
    for (let key in newCriteria) {
      if (createCriteria.hasOwnProperty(key)) {
        setter[key](newCriteria[key])
      }
    }
  }

  const handleImageChange = value => {
    setCreateCriteria({
        thumbnail: value
    });
}

  const alert = useAlert();

  useEffect(() => {
    if (isModified === null) {
      setIsModified(false);
    }

    if (isModified === false) {
      setIsModified(true);
    }
  }, [
    title,
    user_id,
    withDescription,
    description,
    video_url,
    thumbnail
  ])

  useHeader({
    title: [
      'Home Content', 'Portfolio',
      props.type === 'edit' ?
        'Edit Portfolio' :
        'Create New Portfolio'
    ],
    path: [
      '/home-content/portfolio',
      '/home-content/portfolio',
      props.type === 'edit' ?
        '/home-content/portfolio/edit/' + props.id :
        '/home-content/portfolio/create'
    ]
  })

  const handleSubmit = status => {
    const data = new FormData();

    if (createCriteria.thumbnail instanceof Blob) {
      data.append('thumbnail', createCriteria.thumbnail, 'portfolio.jpg');
    } else if (typeof createCriteria.thumbnail === "string") {
      data.append('thumbnail_url', createCriteria.thumbnail);
    }

    if (typeof createCriteria.title === "string") {
      data.append("title", createCriteria.title);
    }

    if (typeof createCriteria.user_id === "string") {
      data.append("user_id", createCriteria.user_id);
    }
    
    if (typeof createCriteria.description === "string") {
      data.append("description", createCriteria.description);
    }

    if (typeof status === "string") {
      data.append("status", status)
    }

    if (typeof createCriteria.video_url === "string") {
      data.append("video_url", createCriteria.video_url)
    }

    if (props.type === "edit") {
      data.append("published_at", props.published_at)
    }

    let params;

    if (props.type === 'edit') {
      params = {
        method: 'POST',
        path: 'promotion/portfolio/update/' + props.id,
        data: data
      }
    } else {
      params = {
        method: 'PUT',
        path: 'promotion/portfolio/create',
        data: data
      }
    }

    http(params)
      .then(result => {
        if (result && result.code === 'success') {
          setBack(true);
        } else {
          alert.error(result)
        }
      })
  }

  return (
    <div className={container}>
      <div className={detail}>
        <PageTitle
          title={[
            props.type === 'edit' ?
              'edit portfolio' :
              'create new portfolio'
          ]}
          path={[
            props.type === 'edit' ?
              '/home-content/portfolio/edit/' + props.id :
              '/home-content/portfolio/create'
          ]}
          returnable={true}
          backTo={'/home-content/portfolio'}
        />
        <PortfolioForm 
          createCriteria={createCriteria} 
          setCreateCriteria={setCreateCriteria} 
          initialUser={props.initialUser}
        />
      </div>
      <PortfolioUplaod
        type={props.type}
        status={props.status ? props.status : null}
        onImageChange={handleImageChange}
        createCriteria={createCriteria}
        setCreateCriteria={setCreateCriteria}
        submit={handleSubmit}
        initialImage={createCriteria.thumbnail}
      />
      <Prompt
        when={isModified}
        message={'You have unsaved changes, are you sure you want to leave this page?'}
      />
      {
        back &&
        <Redirect to={'/home-content/portfolio'} />
      }
    </div>
  );
}
