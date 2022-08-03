import Product from "./Product";
import style from "../../styles/Compare.module.css";
import {
  Autocomplete,
  Stack,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { useCompare } from "../../context/CompareContext";
import Cart from "./Cart";
import Image from "next/image";

export const Compare = () => {
  const {
    products,
    setProductsFilter,
    productsFilter,
    categories,
    categoryFetch,
  } = useCompare();

  //   filter by name text field
  const filterName = (inp) => {
    setProductsFilter(
      products.filter((product) => product.title.includes(inp))
    );
  };
  return (
    <div className={style.container}>
      <div className={style.cart}>
        <Cart />
      </div>
      <div className={style.comp}>
        <Stack dir="rtl" spacing={2}>
          <Autocomplete
            freeSolo
            sx={{
              width: "50%",
              height: 30,
              m: "0 auto",
              mb: 3,
              dir: "rtl",
            }}
            disableClearable
            options={products.map((option) => option.title)}
            onInputChange={(e) => filterName(e.target.innerText)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="חפש מוצר"
                onChange={(e) => filterName(e.target.value)}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="end">
                      <Image
                        src="/search.png"
                        width={20}
                        height={20}
                        alt="search"
                      />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <div className={style.buttons}>
            {categories.map((category) => {
              return (
                <Button
                  key={category._id}
                  className={style.button}
                  onClick={() => categoryFetch(category._id)}
                >
                  <Image src={category.img} height={50} width={50} alt="veg" />
                  <strong> {category.titleheb}</strong>
                </Button>
              );
            })}
          </div>
        </Stack>
        <div className={style.products}>
          {productsFilter.map((item) => (
            <Product product={item} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
};
