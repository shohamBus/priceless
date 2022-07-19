import Product from "./Product";
import style from "../styles/Compare.module.css";
import {
  Autocomplete,
  Stack,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { useCompare } from "../context/CompareContext";
import Cart from "./Cart";
import Image from "next/image";

export const Compare = () => {
  const { products, setProductsFilter, productsFilter, categoryFetch } =
    useCompare();
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
              <Button
                className={style.button}
                onClick={() => categoryFetch("62d557e81237e414e6c8ca78")}
              >
                <Image src="/baby.png" height={50} width={50} alt="veg" />
                <strong> תינוקות</strong>
              </Button>
              <Button
                className={style.button}
                onClick={() => categoryFetch("62d554d11237e414e6c8ca35")}
              >
                <Image
                  src="/meatandfish.png"
                  height={50}
                  width={50}
                  alt="veg"
                />
                <strong>בשר ודגים</strong>
              </Button>
              <Button
                className={style.button}
                onClick={() => categoryFetch("62d54d911237e414e6c8c99f")}
              >
                <Image src="/eggandmilk.png" height={50} width={50} alt="veg" />
                <strong>ביצים וחלב</strong>
              </Button>
              <Button
                className={style.button}
                onClick={() => categoryFetch("62c176f72e626395371b107c")}
              >
                <Image src="/fruit.png" height={50} width={50} alt="fruit" />
                <strong>פירות</strong>
              </Button>
              <Button
                className={style.button}
                onClick={() => categoryFetch("62c177162e626395371b107e")}
              >
                <Image src="/veg.png" height={50} width={50} alt="veg" />
                <strong>ירקות</strong>
              </Button>
            </div>
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
