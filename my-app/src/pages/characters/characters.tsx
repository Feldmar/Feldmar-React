import React from 'react';
import IceandfireApi from "../../servises/iceandfire";
import { Characters } from "../../types/characters";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
position: 'absolute' as 'absolute',
top: '50%',
left: '50%',
transform: 'translate(-50%, -50%)',
width: 400,
bgcolor: 'background.paper',
border: '2px solid #000',
boxShadow: 24,
p: 4,
};
type CProps = any;


type CState = {
characters: [] | Characters[];
isLoading: boolean;
isError: boolean;
page: number;
pageSize: number;
open: boolean;
setOpen: boolean;
};

export default class Character extends React.Component<CProps, CState> {

  state = {
  characters: [],
  isLoading: false,
  isError: false,
  page: 1,
  pageSize: 10,
  open: false,
  setOpen: false
  };

  getCharacters = () => {
  const { page, pageSize } = this.state;
  this.setState({ isLoading: true });
  IceandfireApi.getCharacters(page, pageSize)
  .then((res: Characters[]) => {
  this.setState({ characters: res, isLoading: false });
  })
  .catch((e: any) => {
  this.setState({ isLoading: false, isError: true });
  });
  };
  componentDidMount() {
  this.getCharacters();
  }

  handlerPage = (type: "left" | "right") => {
  if (type === "left" && this.state.page > 1) {
  this.setState({ page: this.state.page - 1 });
  } else {
  this.setState({ page: this.state.page + 1 });
  }
  this.getCharacters();
  };
  componentDidUpdate() {
  console.log("componentDidUpdate");
  }


  render() {
  console.log(this.state);
  const { characters, isLoading, isError } = this.state;
  const { open, setOpen } = this.state;
  // const [open, setOpen] = React.useState(false);
  const handleOpen = () => this.setState({ setOpen: true, open: true});
  const handleClose = () => this.setState({ setOpen: false, open: false});



  return (
  <div className="characters">
    {isError && "Error"}
    {isLoading && "Loading"}
    {characters &&
    !isError &&
    !isLoading &&
    this.state.characters.map((el: Characters) => (
    <div key={el.name}>

      <div>
        <div onClick={handleOpen}> {el.name} </div>
        <Modal open={open}onClose={handleClose}aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography id="modal-modal-description">
              Имя: {el.name}
            </Typography>
            <Typography id="modal-modal-description">
              Умер: {el.died}
            </Typography>
            <Typography id="modal-modal-description">
              Гражданство: {el.culture}
            </Typography>
            <Typography id="modal-modal-description">
              Актер: {el.playedBy}
            </Typography>
            <Typography id="modal-modal-description">
              Погоняло: {el.aliases}
            </Typography>
          </Box>
        </Modal>

      </div>

    </div>
    ))}


    {characters && !isError && (
    <div className="characters-nav">
      <button disabled={this.state.page===1} onClick={(_e: any)=> this.handlerPage("left")}
        >
        left
      </button>
      <button onClick={(_e: any)=> this.handlerPage("right")}>
        right
      </button>
    </div>
    )}
  </div>
  );
  }
  }