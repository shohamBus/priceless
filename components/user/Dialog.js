import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Input } from "@mui/material";
import { useSession } from "next-auth/react";
import { useCompare } from "../../context/CompareContext";
import axios from "axios";

export default function AlertDialog() {
  const { cartProducts, getUser } = useCompare();
  const [open, setOpen] = React.useState(false);
  const { data: session, status } = useSession();
  let title = "";
  //if user get details
  const email = session?.user?.email;
  useEffect(() => {
    if (email) {
      getUser(email);
    }
  }, [session]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleContent = (e) => {
    return (title = e.target.value);
  };
  //send the cart product the title and the email
  const handleClick = async () => {
    await axios.patch(`/api/user`, { cartProducts, email, title });
  };

  return (
    <div>
      <Button
        sx={{ backgroundColor: "#76e346", color: "black", p: 2, m: 2 }}
        onClick={handleClickOpen}
      >
        {" "}
        שמור עגלה
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {email ? (
          //if login
          <>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Enter name of the cart:{" "}
              </DialogContentText>
              <Input onChange={handleContent} type="text">
                {" "}
              </Input>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  handleClick();
                  handleClose();
                }}
                autoFocus
              >
                Enter
              </Button>
            </DialogActions>
          </>
        ) : (
          //if not login
          <>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                עליך להתחבר בכדי לשמור את העגלה
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                הבנתי
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}

//  {axios.patch(`/api/user`, { cartProducts, email,title })}
