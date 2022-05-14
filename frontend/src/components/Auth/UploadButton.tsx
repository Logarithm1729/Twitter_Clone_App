import { PhotoCamera } from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface PROPS_UPLOAD {
  name: string;
  isMultiple: boolean;
  onChange: any;
}

export const UploadButton = (props: PROPS_UPLOAD) => {
  return (
    <label htmlFor={`upload-button-${props.name}`}>
      <input
        type="file"
        style={{ display: "none" }}
        accept="image/*"
        id={`upload-button-${props.name}`}
        multiple={props.isMultiple ? true : false}
        name={props.name}
        onChange={props.onChange}
      />
      <IconButton color="primary" aria-label="upload picture" component="span">
        <PhotoCamera />
      </IconButton>
    </label>
  );
};
