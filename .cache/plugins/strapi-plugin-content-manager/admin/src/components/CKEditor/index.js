import React from 'react';
import PropTypes from 'prop-types';
import CKEditor from '@ckeditor/ckeditor5-react';
import styled from 'styled-components';
import { auth } from 'strapi-helper-plugin';
import ClassicEditor from './ckeditor'

const Wrapper = styled.div`
  .ck-editor__main {
    min-height: 200px;
    > div {
      min-height: 200px;
    }
  }
`;

//const Editor = ({ onChange, name, value }) => {

//const jwtToken = auth.getToken();

const Editor = ({ onChange, name, value }) => {
  const uploadUrl = `${strapi.backendURL}/upload`
  const headers = {
    Authorization: 'Bearer ' + auth.getToken(),
  }


  return (
    <Wrapper>
      <CKEditor
        editor={ClassicEditor}
        data={value}     
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange({ target: { name, value: data } });
        }}
        config={{
            strapiUpload: {
            uploadUrl,
            headers,
             },
            toolbar: [
                'heading',
                '|',
                "bold",  "italic", "link", "fontsize", "fontcolor", "essentials",  "code", "codeBlock", 
                '|',
                'bulletedList', 'numberedList', 'alignment', 'mathtype', "link", "list", "mediaembed", "exportPdf", "pastefromoffice", 
                '|',
                'blockQuote', 'imageUpload', 
               
        
            ],
            }}
          
      />
    </Wrapper>
  );
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export default Editor