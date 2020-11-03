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

             templates: {
              simple: {
                label: 'Simple',
                template: '<div class="simple"></div>',
              },
           
            }, 
        
            image: {
    
              styles: [
                  'alignLeft', 'alignCenter', 'alignRight'
              ],
  
              // Configure the available image resize options.
              resizeOptions: [
                  {
                      name: 'imageResize:original',
                      label: 'Original',
                      value: null
                  },
                  {
                      name: 'imageResize:50',
                      label: '50%',
                      value: '50'
                  },
                  {
                      name: 'imageResize:75',
                      label: '75%',
                      value: '75'
                  }
              ],
              fontSize: {
                options: [
                    'tiny',
                    'default',
                    'big'
                ]
              },
  
              toolbar: [
                  'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
                  '|',
                  'imageResize',
                  '|',
                  'imageTextAlternative'
              ]
            },
            toolbar: {
              items: [
                'Heading',
                '|',
                "Bold",  "Italic", "fontSize", "FontColor",  "Code", "codeBlock", 
                '|',
                'BulletedList', 'NumberedList', 'Alignment', 'MathType', "MediaEmbed", "ExportPDF", 'ImageInsert', "ImageUpload",
                '|',
                'BlockQuote', 'Undo', 'Redo', 'Anchor', 
               
            ]},
            language: "en"
            
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