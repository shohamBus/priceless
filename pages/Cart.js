import React from "react";
import Fruit from "../components/Fruit";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import style from "../styles/Cart.module.css";
import { Autocomplete, Link, Stack, TextField } from "@mui/material";
function Cart() {
  const fruits = [
    {
      "id": 1,
      "name": "apple",
    },
    {
      "id": 2,
      "name": "banana",
    },
    {
      "id": 3,
      "name": "orange",
    },
  ];
  function createData(number, item, amount) {
    return { number, item, amount };
  }
  const rows = [
    createData(1, "banana", 3),
    createData(2, "orange", 5),
    createData(3, "apple", 6),
  ];
  return (
    <>
      <div className={style.header}>
        <Link href="/">
          <Image
            src="/logo-grey.png"
            className={style.logo}
            width={100}
            height={100}
            alt="logo"
          />
        </Link>
      </div>
      <div className={style.container}>
        <div className={style.main}>
          <h2>your cart:</h2>
          <TableContainer component={Paper}>
            <Table sx={{}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <h3>number</h3>
                  </TableCell>
                  <TableCell align="right">
                    <h3>item</h3>
                  </TableCell>
                  <TableCell align="right">
                    <h3>amount</h3>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.number}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.number}
                    </TableCell>
                    <TableCell align="right">{row.item}</TableCell>
                    <TableCell align="right">
                      <button>+</button>
                      {row.amount}
                      <button>-</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className={style.main}>
          <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={fruits.map((option) => option.name)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search input"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </Stack>
          <div>
            {fruits.map((item) => (
              <Fruit fruit={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
