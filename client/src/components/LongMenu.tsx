import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Props, Pair} from './props/Props';
import PropsString from './props/PropsString';

const ITEM_HEIGHT = 48;

type ChildComponentProps = {
  handleIdChoice: (id: number, name:string) => void;
  forMenu: PropsString;
};

const LongMenu: React.FC<ChildComponentProps> = (prop)  => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleId = (id:number, name:string) =>{
    prop.handleIdChoice(id, name);
    console.log("id ktore malo byt " + id);

    handleClose();
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='icon-button'>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >{prop.forMenu.name}
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {prop.forMenu.propWhichIsArray.map((option) => (
          <MenuItem onClick={() => {
            handleId(option.value, option.label);}
          }>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default LongMenu;