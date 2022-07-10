import Product from "./Product";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import style from "../styles/Compare.module.css";
import { Autocomplete, Stack, TextField, Button } from "@mui/material";
import { useCompare } from "../context/CompareContext";
import Cart from "./Cart";
import { ButtonGroup } from "react-bootstrap";
// import { Cart } from "./Cart";
// import { SupersCheckbox } from "./SupersCheckbox";

export const Compare = () => {
  const {
    supers,
    products,
    setProductsFilter,
    productsFilter,
    cartProducts,
    setCartProducts,
    decrement,
    addToCart,
    categoryFetch,
  } = useCompare();
  //   filter by name
  const filterName = (inp) => {
    setProductsFilter(
      products.filter((product) => product.title.includes(inp))
    );
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.main}>
          <Cart />
        </div>
        <div className={style.main}>
          <Stack spacing={2}>
            <Autocomplete
              dir="rtl"
              freeSolo
              disableClearable
              options={products.map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search input"
                  onChange={(e) => filterName(e.target.value)}
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
            <ButtonGroup>
              <Button
                sx={{ backgroundColor: "#76e346", color: "black", m: 0.5 }}
                onClick={() => categoryFetch("62c176f72e626395371b107c")}
              >
                פירות
              </Button>
              <Button
                sx={{ backgroundColor: "#76e346", color: "black", m: 0.5 }}
                onClick={() => categoryFetch("62c177162e626395371b107e")}
              >
                ירקות
              </Button>
            </ButtonGroup>
          </Stack>
          <div className={style.products}>
            {productsFilter.map((item) => (
              <Product product={item} key={item._id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
