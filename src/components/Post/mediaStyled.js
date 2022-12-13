import styled from 'styled-components'

export const MediaImg = styled.img`
  max-height: 100%;
  min-width: 100%;
  max-width: 100%;

  /* object-fit: cover; */

  @media only screen and (max-width: 400px) {
    /* max-height: 100%; */
    max-width: 100vw;
    min-height: 50vh;
    min-width: 100vw;
    object-fit: cover;
    /* filter: grayscale(); */
  }
`
export const MediaVideo = styled.video`
  max-height: 500px;

  /* max-height: fit-content;
  max-width: 400px;
  min-width: 100%; */

  @media only screen and (max-width: 460px) {
    max-height: 500px;
    min-height: 100%;
    min-width: 100%;
  }
`
