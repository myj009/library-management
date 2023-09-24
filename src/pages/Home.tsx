import Header from "../components/Header";
import styles from "./styles/home.module.css";
import { useAuth } from "../contexts/AuthContext";
import Table from "../components/Table";
import { FilterFields } from "../types/utils.types";
import { useEffect, useState } from "react";

function HomePage() {
  const { user } = useAuth();
  const [filters, setFilters] = useState<FilterFields[]>([
    {
      name: "user_id",
      operator: "==",
      value: user ? user.uid : "",
    },
  ]);

  useEffect(() => {
    setFilters([
      {
        name: "user_id",
        operator: "==",
        value: user ? user.uid : "",
      },
    ]);
  }, [user]);

  return (
    <>
      <Header />
      <div className={styles.main_div}>
        {user && user.uid !== "" && (
          <Table
            collection="books"
            sortFields={{ sortBy: "title", sortOrder: "asc" }}
            filters={filters}
            action="return"
          />
        )}
      </div>
    </>
  );
}

export default HomePage;
