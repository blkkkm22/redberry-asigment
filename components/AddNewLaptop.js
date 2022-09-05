import React from "react";
import "../styles/AddNewLaptop.css";

export default function AddNewLaptop() {
  const [formData, setFormData] = React.useState({
    name: "",
    surname: "",
    team: "",
    team_id: "",
    position: "",
    position_id: "",
    email: "",
    phone_number: "",
    laptop_name: "",
    brand: "",
    laptop_brand_id: "",
    laptop_cpu: "",
    laptop_cpu_cores: "",
    laptop_cpu_threads: "",
    laptop_ram: "",
    laptop_hard_drive_type: "",
    laptop_purchase_date: "",
    laptop_price: "",
    laptop_state: "",
    token: "77858bffd78d64e87b33e09c97787d8c",
  });

  const [formPage, setFormPage] = React.useState("first");
  const [teams, setTeams] = React.useState([]);
  const [positions, setPositions] = React.useState([]);
  const [brands, setBrands] = React.useState([]);
  const [cpus, setCpus] = React.useState([]);

  React.useEffect(() => {
    /*   if (localStorage.getItem("form") != null) {
      setFormData(JSON.parse(localStorage.getItem("form")));
    }
      */

    if (localStorage.getItem("formPage") != null) {
      setFormPage(localStorage.getItem("formPage"));
    }
    localStorage.setItem("addPage", true);
  }, []);

  async function teamsDropdown() {
    await fetch("https://pcfy.redberryinternship.ge/api/teams")
      .then((res) => res.json())
      .then((obj) =>
        setTeams(
          obj.data.map((element) => (
            <option value={element.name}>{element.name}</option>
          ))
        )
      );
  }

  async function positionsDropdown() {
    await fetch("https://pcfy.redberryinternship.ge/api/positions")
      .then((res) => res.json())
      .then((obj) =>
        setPositions(
          obj.data
            .filter((e) => e.team_id == formData.team_id)
            .map((element) => (
              <option value={element.name}>{element.name}</option>
            ))
        )
      );
  }

  async function brandsDropdown() {
    await fetch("https://pcfy.redberryinternship.ge/api/brands")
      .then((res) => res.json())
      .then((obj) =>
        setBrands(
          obj.data.map((element) => (
            <option value={element.name}>{element.name}</option>
          ))
        )
      );
  }

  async function cpusDropdown() {
    await fetch("https://pcfy.redberryinternship.ge/api/cpus")
      .then((res) => res.json())
      .then((obj) =>
        setCpus(
          obj.data.map((element) => (
            <option value={element.name}>{element.name}</option>
          ))
        )
      );
  }

  function clearSelected() {
    var elements = document.getElementById("position").options;

    for (var i = 0; i < elements.length; i++) {
      elements[i].selected = false;
    }
  }

  async function changeTeamID(value) {
    const arr = await fetch("https://pcfy.redberryinternship.ge/api/teams")
      .then((res) => res.json())
      .then((obj) => obj.data);
    for (const e of arr) {
      if (e.name == value) {
        formData.team_id = e.id;
      }
    }
  }

  async function changePositionID(value) {
    const arr = await fetch("https://pcfy.redberryinternship.ge/api/positions")
      .then((res) => res.json())
      .then((obj) => obj.data);
    for (const e of arr) {
      if (e.name == value) {
        formData.position_id = e.id;
      }
    }
  }

  async function changeLaptopBrandID(value) {
    const arr = await fetch("https://pcfy.redberryinternship.ge/api/brands")
      .then((res) => res.json())
      .then((obj) => obj.data);
    for (const e of arr) {
      if (e.name == value) {
        formData.laptop_brand_id = e.id;
      }
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (name == "team") {
      clearSelected();
      formData.position_id = "";
      formData.position = "";
      formData.team = value;
      changeTeamID(value);
    } else if (name == "position") {
      formData.position = value;
      changePositionID(value);
    } else if (name == "brand") {
      formData.brand = value;
      changeLaptopBrandID(value);
    } else {
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          [name]: value,
        };
      });
    }
    localStorage.setItem("form", JSON.stringify(formData));
  }

  function nextPage() {
    let valid = true;
    if (!regEx(formData.name, "onlyGeorgian") || formData.name.length < 2) {
      document.getElementById("name-label").style.color = "red";
      document.getElementById("name").style.border = "1.8px solid red";
      document.getElementById("name-comment").style.color = "red";
      valid = false;
    } else {
      document.getElementById("name-label").style.color = "black";
      document.getElementById("name").style.border = "1.8px solid #8ac0e2";
      document.getElementById("name-comment").style.color =
        "rgba(0, 0, 0, 0.6)";
    }

    if (
      !regEx(formData.surname, "onlyGeorgian") ||
      formData.surname.length < 2
    ) {
      document.getElementById("surname-label").style.color = "red";
      document.getElementById("surname").style.border = "1.8px solid red";
      document.getElementById("surname-comment").style.color = "red";
      valid = false;
    } else {
      document.getElementById("surname-label").style.color = "black";
      document.getElementById("surname").style.border = "1.8px solid #8ac0e2";
      document.getElementById("surname-comment").style.color =
        "rgba(0, 0, 0, 0.6)";
    }

    if (formData.team == "") {
      document.getElementById("team").style.border = "1.8px solid red";
      valid = false;
    } else {
      document.getElementById("team").style.border = "none";
    }

    if (formData.position == "") {
      document.getElementById("position").style.border = "1.8px solid red";
      valid = false;
    } else {
      document.getElementById("position").style.border = "none";
    }

    if (
      !formData.email.endsWith("@redberry.ge") ||
      formData.email.length < 13
    ) {
      document.getElementById("email-label").style.color = "red";
      document.getElementById("email").style.border = "1.8px solid red";
      document.getElementById("email-comment").style.color = "red";
      valid = false;
    } else {
      document.getElementById("email-label").style.color = "black";
      document.getElementById("email").style.border = "1.8px solid #8ac0e2";
      document.getElementById("email-comment").style.color =
        "rgba(0, 0, 0, 0.6)";
    }

    if (
      !formData.phone_number.startsWith("+995") ||
      !regEx(
        formData.phone_number.replace(/\s/g, ""),
        "notExtraSymbolsForPhone"
      ) ||
      formData.phone_number.replace(/\s/g, "").length != 13
    ) {
      document.getElementById("phone-label").style.color = "red";
      document.getElementById("phone_number").style.border = "1.8px solid red";
      document.getElementById("phone-comment").style.color = "red";
      valid = false;
    } else {
      document.getElementById("phone-label").style.color = "black";
      document.getElementById("phone_number").style.border =
        "1.8px solid #8ac0e2";
      document.getElementById("phone-comment").style.color =
        "rgba(0, 0, 0, 0.6)";
    }

    if (valid) {
      setFormPage("second");
      localStorage.setItem("formPage", "second");
    }
  }

  function prevPage() {
    setFormPage("first");
    localStorage.setItem("formPage", "first");
  }

  function handleSubmit(event) {
    let valid = true;

    if (!regEx(formData.laptop_name, "notExtraSymbolsForLaptopName")) {
      document.getElementById("laptop_name_label").style.color = "red";
      document.getElementById("laptop_name").style.border = "1.8px solid red";
      document.getElementById("laptop_name_comment").style.color = "red";
      valid = false;
    } else {
      document.getElementById("laptop_name_label").style.color = "black";
      document.getElementById("laptop_name").style.border =
        "1.8px solid #8ac0e2";
      document.getElementById("laptop_name_comment").style.color =
        "rgba(0, 0, 0, 0.6)";
    }

    if (formData.brand == "") {
      document.getElementById("brand").style.border = "1.8px solid red";
      valid = false;
    } else {
      document.getElementById("brand").style.border = "none";
    }

    if (formData.laptop_cpu == "") {
      document.getElementById("cpu-dropdown").style.border = "1.8px solid red";
      console.log("asdasd");
      valid = false;
    } else {
      document.getElementById("cpu-dropdown").style.border = "none";
    }

    if (!regEx(formData.laptop_cpu_cores, "onlyNumbers")) {
      document.getElementById("laptop_cpu_cores_label").style.color = "red";
      document.getElementById("laptop_cpu_cores").style.border =
        "1.8px solid red";
      document.getElementById("laptop_cpu_cores_comment").style.color = "red";
      valid = false;
    } else {
      document.getElementById("laptop_cpu_cores_label").style.color = "black";
      document.getElementById("laptop_cpu_cores").style.border =
        "1.8px solid #8ac0e2";
      document.getElementById("laptop_cpu_cores_comment").style.color =
        "rgba(0, 0, 0, 0.6)";
    }

    if (!regEx(formData.laptop_cpu_threads, "onlyNumbers")) {
      document.getElementById("laptop_cpu_threads_label").style.color = "red";
      document.getElementById("laptop_cpu_threads").style.border =
        "1.8px solid red";
      document.getElementById("laptop_cpu_threads_comment").style.color = "red";
      valid = false;
    } else {
      document.getElementById("laptop_cpu_threads_label").style.color = "black";
      document.getElementById("laptop_cpu_threads").style.border =
        "1.8px solid #8ac0e2";
      document.getElementById("laptop_cpu_threads_comment").style.color =
        "rgba(0, 0, 0, 0.6)";
    }

    if (!regEx(formData.laptop_ram, "onlyNumbers")) {
      document.getElementById("laptop_ram_label").style.color = "red";
      document.getElementById("laptop_ram").style.border = "1.8px solid red";
      document.getElementById("laptop_ram_comment").style.color = "red";
      valid = false;
    } else {
      document.getElementById("laptop_ram_label").style.color = "black";
      document.getElementById("laptop_ram").style.border =
        "1.8px solid #8ac0e2";
      document.getElementById("laptop_ram_comment").style.color =
        "rgba(0, 0, 0, 0.6)";
    }

    if (formData.laptop_hard_drive_type == "") {
      document.getElementById("laptop_hard_drive_type").style.color = "red";
      valid = false;
    } else {
      document.getElementById("laptop_hard_drive_type").style.color = "black";
    }

    if (!regEx(formData.laptop_price, "onlyNumbers")) {
      document.getElementById("laptop_price_label").style.color = "red";
      document.getElementById("laptop_price").style.border = "1.8px solid red";
      document.getElementById("laptop_price_comment").style.color = "red";
      valid = false;
    } else {
      document.getElementById("laptop_price_label").style.color = "black";
      document.getElementById("laptop_price").style.border =
        "1.8px solid #8ac0e2";
      document.getElementById("laptop_price_comment").style.color =
        "rgba(0, 0, 0, 0.6)";
    }

    if (formData.laptop_state == "") {
      document.getElementById("laptop-state").style.color = "red";
      valid = false;
    } else {
      document.getElementById("laptop-state").style.color = "black";
    }

    if (valid) {
      event.preventDefault();

      const options = {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch("https://pcfy.redberryinternship.ge/api/laptop/create", options)
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  }

  function regEx(targer, regExx) {
    const reg = {
      onlyGeorgian: /^[ა-ჰ]+$/g,
      onlyNumbers: /^[0-9]+$/g,
      notExtraSymbolsForPhone: /^[0-9+]+$/g,
      notExtraSymbolsForLaptopName: /^[0-9a-zA-Z!@#$%^&*()_+=]+$/g,
    };
    const re = new RegExp(reg[regExx]);
    const valid = re.test(targer);

    return valid;
  }

  return (
    <div>
      {window.innerWidth > 800 && (
        <div>
          <button class="back" type="button">
            <img class="back-icon" src={require("../images/Vector.png")} />
          </button>

          <div class="titles">
            <div>
              <h3>თანამშრომლის ინფო</h3>
              {formPage == "first" && <div class="line"></div>}
            </div>
            <div>
              <h3>ლეპტოპის მახასიათებლები</h3>
              {formPage == "second" && <div class="line"></div>}
            </div>
          </div>

          <div class="container">
            <form
              class="form"
              onSubmit={handleSubmit}
              //          action="https://pcfy.redberryinternship.ge/api/laptop/create"
              //    method="POST"
            >
              {formPage == "first" && (
                <div>
                  <div class="employee-name">
                    <div class="label-frame-comment">
                      <label id="name-label" class="label" htmlFor="name">
                        სახელი
                      </label>
                      <br />
                      <input
                        class="frame1"
                        id="name"
                        type="text"
                        placeholder="სახელი"
                        onChange={handleChange}
                        name="name"
                        value={formData.name}
                      />
                      <p id="name-comment" class="comment">
                        მინიმუმ 2 სიმბოლო, ქართული ასოები
                      </p>
                    </div>
                    <div class="label-frame-comment">
                      <label id="surname-label" class="label" htmlFor="surname">
                        გვარი
                      </label>
                      <br />
                      <input
                        class="frame1"
                        id="surname"
                        type="text"
                        placeholder="გვარი"
                        onChange={handleChange}
                        name="surname"
                        value={formData.surname}
                      />
                      <p id="surname-comment" class="comment">
                        მინიმუმ 2 სიმბოლო, ქართული ასოები
                      </p>
                    </div>
                  </div>

                  <select
                    class="team-position"
                    id="team"
                    value={formData.team}
                    onChange={handleChange}
                    onClick={teamsDropdown}
                    name="team"
                  >
                    <option value="team" selected hidden>
                      თიმი
                    </option>
                    {teams}
                  </select>

                  <select
                    class="team-position"
                    id="position"
                    value={formData.position}
                    onChange={handleChange}
                    onClick={positionsDropdown}
                    name="position"
                  >
                    <option value="position" selected hidden>
                      პოზიცია
                    </option>
                    {positions}
                  </select>

                  <div class="label-frame-comment">
                    <label id="email-label" class="label" htmlFor="email">
                      მეილი
                    </label>
                    <br />
                    <input
                      class="frame2"
                      id="email"
                      type="text"
                      placeholder="tkokhreidze9@redberry.ge"
                      onChange={handleChange}
                      name="email"
                      value={formData.email}
                    />
                    <p id="email-comment" class="comment">
                      უნდა მთავრდებოდეს @redberry.ge-ით
                    </p>
                  </div>

                  <div class="label-frame-comment">
                    <label
                      id="phone-label"
                      class="label"
                      htmlFor="phone_number"
                    >
                      ტელეფონის ნომერი
                    </label>
                    <input
                      class="frame2"
                      id="phone_number"
                      type="text"
                      placeholder="+995 571 122 566"
                      onChange={handleChange}
                      name="phone_number"
                      value={formData.phone_number}
                    />
                    <p id="phone-comment" class="comment">
                      უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს
                    </p>
                  </div>

                  <button
                    class="next-page-btn"
                    type="button"
                    onClick={nextPage}
                  >
                    შემდეგი
                  </button>
                </div>
              )}

              {formPage == "second" && (
                <div>
                  <div class="laptop-img">
                    <div class="img-cont">
                      <p class="laptop-img-text">
                        ჩააგდე ან ატვირთე ლეპტოპის ფოტო
                      </p>
                      <input
                        type="file"
                        id="laptop-img-btn"
                        class="laptop-img-btn"
                        name="filename"
                      ></input>
                    </div>
                  </div>

                  <div class="laptop-name-brand">
                    <div>
                      <label
                        id="laptop_name_label"
                        class="label"
                        htmlFor="laptop_name"
                      >
                        ლეპტოპის სახელი
                      </label>
                      <input
                        id="laptop_name"
                        class="frame1"
                        type="text"
                        placeholder="HP"
                        onChange={handleChange}
                        name="laptop_name"
                        value={formData.laptop_name}
                      />
                      <p id="laptop_name_comment" class="comment">
                        ლათინური ასოები, ციფრები, !@#$%^&*()_+={" "}
                      </p>
                    </div>

                    <select
                      id="brand"
                      class="half-dropdown"
                      value={formData.brand}
                      onChange={handleChange}
                      onClick={brandsDropdown}
                      name="brand"
                    >
                      <option value="brand" selected hidden>
                        ლეპტოპის ბრენდი
                      </option>
                      {brands}
                    </select>
                  </div>

                  <div class="full-line"></div>

                  <div class="cpu">
                    <div class="cpu-trio">
                      <select
                        id="cpu-dropdown"
                        class="cpu-dropdown"
                        value={formData.laptop_cpu}
                        onChange={handleChange}
                        onClick={cpusDropdown}
                        name="laptop_cpu"
                      >
                        <option value="laptop_cpu" selected hidden>
                          CPU
                        </option>
                        {cpus}
                      </select>
                    </div>

                    <div class="cpu-trio">
                      <label
                        id="laptop_cpu_cores_label"
                        class="label"
                        htmlFor="laptop_cpu_cores"
                      >
                        CPU-ს ბირთვი
                      </label>
                      <input
                        id="laptop_cpu_cores"
                        class="frame3"
                        type="text"
                        placeholder="14"
                        onChange={handleChange}
                        name="laptop_cpu_cores"
                        value={formData.laptop_cpu_cores}
                      />
                      <p id="laptop_cpu_cores_comment" class="comment">
                        მხოლოდ ციფრები
                      </p>
                    </div>

                    <div class="cpu-trio">
                      <label
                        id="laptop_cpu_threads_label"
                        class="label"
                        htmlFor="laptop_cpu_threads"
                      >
                        CPU-ს ნაკადი
                      </label>
                      <input
                        id="laptop_cpu_threads"
                        class="frame3"
                        type="text"
                        placeholder="365"
                        onChange={handleChange}
                        name="laptop_cpu_threads"
                        value={formData.laptop_cpu_threads}
                      />
                      <p id="laptop_cpu_threads_comment" class="comment">
                        მხოლოდ ციფრები
                      </p>
                    </div>
                  </div>

                  <div class="ram-memory-date-price">
                    <div class="duo">
                      <label
                        id="laptop_ram_label"
                        class="label"
                        htmlFor="laptop_ram"
                      >
                        ლეპტოპის RAM (GB)
                      </label>
                      <input
                        id="laptop_ram"
                        class="frame1"
                        type="text"
                        placeholder="16"
                        onChange={handleChange}
                        name="laptop_ram"
                        value={formData.laptop_ram}
                      />
                      <p id="laptop_ram_comment" class="comment">
                        მხოლოდ ციფრები
                      </p>
                    </div>

                    <div class="duo">
                      <fieldset class="fieldset">
                        <legend id="laptop_hard_drive_type">
                          მეხსიერების ტიპი
                        </legend>
                        <input
                          type="radio"
                          id="SSD"
                          name="laptop_hard_drive_type"
                          value="SSD"
                          checked={formData.laptop_hard_drive_type === "SSD"}
                          onChange={handleChange}
                        />
                        <label htmlFor="SSD">SSD</label>

                        <input
                          type="radio"
                          id="HDD"
                          name="laptop_hard_drive_type"
                          value="HDD"
                          checked={formData.laptop_hard_drive_type === "HDD"}
                          onChange={handleChange}
                        />
                        <label htmlFor="HDD">HDD</label>
                      </fieldset>
                    </div>
                  </div>

                  <div class="full-line"></div>

                  <div class="ram-memory-date-price">
                    <div>
                      <label
                        id="laptop_purchase_date_label"
                        class="label"
                        htmlFor="laptop_purchase_date"
                      >
                        შეძენის რიცხვი (არჩევითი)
                      </label>
                      <input
                        id="laptop_purchase_date"
                        class="frame1"
                        type="text"
                        placeholder="დდ/თთ/წწწწ"
                        onChange={handleChange}
                        name="laptop_purchase_date"
                        value={formData.laptop_purchase_date}
                      />
                    </div>

                    <div>
                      <label
                        id="laptop_price_label"
                        class="label"
                        htmlFor="laptop_price"
                      >
                        ლეპტოპის ფასი
                      </label>
                      <input
                        id="laptop_price"
                        class="frame1"
                        type="text"
                        placeholder="0000"
                        onChange={handleChange}
                        name="laptop_price"
                        value={formData.laptop_price}
                      />
                      <p id="laptop_price_comment" class="comment">
                        მხოლოდ ციფრები
                      </p>
                    </div>
                  </div>

                  <div class="duo">
                    <fieldset class="fieldset">
                      <legend id="laptop-state">ლეპტოპის მდგომარეობა</legend>
                      <input
                        type="radio"
                        id="new"
                        name="laptop_state"
                        value="new"
                        checked={formData.laptop_state === "new"}
                        onChange={handleChange}
                      />
                      <label htmlFor="new">ახალი</label>

                      <input
                        type="radio"
                        id="used"
                        name="laptop_state"
                        value="used"
                        checked={formData.laptop_state === "used"}
                        onChange={handleChange}
                      />
                      <label htmlFor="used">მეორადი</label>
                      <br />
                    </fieldset>
                  </div>

                  <div class="buttons">
                    <button class="ukan" type="button" onClick={prevPage}>
                      უკან
                    </button>
                    <button class="submit">დამახსოვრება</button>
                  </div>
                </div>
              )}
            </form>
          </div>

          <img class="logo" src={require("../images/LOGO-10 2.png")} />
        </div>
      )}

      {window.innerWidth <= 800 && (
        <div>
          <button class="back" type="button">
            <img class="back-icon" src={require("../images/Vector (1).png")} />
          </button>

          {formPage == "first" ? (
            <div class="title">
              <h3>თანამშრომლის ინფო</h3>
              <p>1/2</p>
            </div>
          ) : (
            <div class="title">
              <h3>ლეპტოპის მახასიათებლები</h3>
              <p>2/2</p>
            </div>
          )}

          <div class="container">
            <form
              class="form"
              onSubmit={handleSubmit}
              //         action="https://pcfy.redberryinternship.ge/api/laptop/create"
              //      method="POST"
            >
              {formPage == "first" && (
                <div>
                  <div class="label-frame-comment">
                    <label id="name-label" class="label" htmlFor="name">
                      სახელი
                    </label>
                    <br />
                    <input
                      class="mobile-frame"
                      id="name"
                      type="text"
                      placeholder="სახელი"
                      onChange={handleChange}
                      name="name"
                      value={formData.name}
                    />
                    <p id="name-comment" class="comment">
                      მინიმუმ 2 სიმბოლო, ქართული ასოები
                    </p>
                  </div>

                  <div class="label-frame-comment">
                    <label id="surname-label" class="label" htmlFor="surname">
                      გვარი
                    </label>
                    <br />
                    <input
                      class="mobile-frame"
                      id="surname"
                      type="text"
                      placeholder="გვარი"
                      onChange={handleChange}
                      name="surname"
                      value={formData.surname}
                    />
                    <p id="surname-comment" class="comment">
                      მინიმუმ 2 სიმბოლო, ქართული ასოები
                    </p>
                  </div>

                  <select
                    class="mobile-dropdown"
                    id="team"
                    value={formData.team}
                    onChange={handleChange}
                    onClick={teamsDropdown}
                    name="team"
                  >
                    <option value="team" selected hidden>
                      თიმი
                    </option>
                    {teams}
                  </select>

                  <select
                    class="mobile-dropdown"
                    id="position"
                    value={formData.position}
                    onChange={handleChange}
                    onClick={positionsDropdown}
                    name="position"
                  >
                    <option value="position" selected hidden>
                      პოზიცია
                    </option>
                    {positions}
                  </select>

                  <div class="label-frame-comment">
                    <label id="email-label" class="label" htmlFor="email">
                      მეილი
                    </label>
                    <br />
                    <input
                      class="mobile-frame"
                      id="email"
                      type="text"
                      placeholder="tkokhreidze9@redberry.ge"
                      onChange={handleChange}
                      name="email"
                      value={formData.email}
                    />
                    <p id="email-comment" class="comment">
                      უნდა მთავრდებოდეს @redberry.ge-ით
                    </p>
                  </div>

                  <div class="label-frame-comment">
                    <label
                      id="phone-label"
                      class="label"
                      htmlFor="phone_number"
                    >
                      ტელეფონის ნომერი
                    </label>
                    <input
                      class="mobile-frame"
                      id="phone_number"
                      type="text"
                      placeholder="+995 571 122 566"
                      onChange={handleChange}
                      name="phone_number"
                      value={formData.phone_number}
                    />
                    <p id="phone-comment" class="comment">
                      უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს
                    </p>
                  </div>

                  <button
                    class="next-page-btn"
                    type="button"
                    onClick={nextPage}
                  >
                    შემდეგი
                  </button>
                </div>
              )}

              {formPage == "second" && (
                <div>
                  <div class="laptop-img">
                    <div class="img-cont">
                      <img
                        class="laptop-img-photo"
                        src={require("../images/Vector (2).png")}
                      />
                      <button class="laptop-img-button" type="button">
                        ლეპტოპის ფოტოს ატვირთვა
                      </button>
                    </div>
                  </div>

                  <div class="label-frame-comment">
                    <label
                      id="laptop_name_label"
                      class="label"
                      htmlFor="laptop_name"
                    >
                      ლეპტოპის სახელი
                    </label>
                    <br />
                    <input
                      id="laptop_name"
                      class="mobile-frame"
                      type="text"
                      placeholder="HP"
                      onChange={handleChange}
                      name="laptop_name"
                      value={formData.laptop_name}
                    />
                    <p id="laptop_name_comment" class="comment">
                      ლათინური ასოები, ციფრები, !@#$%^&*()_+={" "}
                    </p>
                  </div>

                  <select
                    id="brand"
                    class="mobile-dropdown"
                    value={formData.brand}
                    onChange={handleChange}
                    onClick={brandsDropdown}
                    name="brand"
                  >
                    <option value="brand" selected hidden>
                      ლეპტოპის ბრენდი
                    </option>
                    {brands}
                  </select>

                  <select
                    id="cpu-dropdown"
                    class="mobile-dropdown"
                    value={formData.laptop_cpu}
                    onChange={handleChange}
                    onClick={cpusDropdown}
                    name="laptop_cpu"
                  >
                    <option value="laptop_cpu" selected hidden>
                      CPU
                    </option>
                    {cpus}
                  </select>

                  <div class="label-frame-comment">
                    <label
                      id="laptop_cpu_cores_label"
                      class="label"
                      htmlFor="laptop_cpu_cores"
                    >
                      CPU-ს ბირთვი
                    </label>
                    <input
                      id="laptop_cpu_cores"
                      class="mobile-frame"
                      type="text"
                      placeholder="14"
                      onChange={handleChange}
                      name="laptop_cpu_cores"
                      value={formData.laptop_cpu_cores}
                    />
                    <p id="laptop_cpu_cores_comment" class="comment">
                      მხოლოდ ციფრები
                    </p>
                  </div>

                  <div class="label-frame-comment">
                    <label
                      id="laptop_cpu_threads_label"
                      class="label"
                      htmlFor="laptop_cpu_threads"
                    >
                      CPU-ს ნაკადი
                    </label>
                    <input
                      id="laptop_cpu_threads"
                      class="mobile-frame"
                      type="text"
                      placeholder="365"
                      onChange={handleChange}
                      name="laptop_cpu_threads"
                      value={formData.laptop_cpu_threads}
                    />
                    <p id="laptop_cpu_threads_comment" class="comment">
                      მხოლოდ ციფრები
                    </p>
                  </div>

                  <div class="label-frame-comment">
                    <label
                      id="laptop_ram_label"
                      class="label"
                      htmlFor="laptop_ram"
                    >
                      ლეპტოპის RAM (GB)
                    </label>
                    <input
                      id="laptop_ram"
                      class="mobile-frame"
                      type="text"
                      placeholder="16"
                      onChange={handleChange}
                      name="laptop_ram"
                      value={formData.laptop_ram}
                    />
                    <p id="laptop_ram_comment" class="comment">
                      მხოლოდ ციფრები
                    </p>
                  </div>

                  <fieldset class="fieldset">
                    <legend id="laptop_hard_drive_type">
                      მეხსიერების ტიპი
                    </legend>
                    <input
                      type="radio"
                      id="SSD"
                      name="laptop_hard_drive_type"
                      value="SSD"
                      checked={formData.laptop_hard_drive_type === "SSD"}
                      onChange={handleChange}
                    />
                    <label htmlFor="SSD">SSD</label>

                    <input
                      type="radio"
                      id="HDD"
                      name="laptop_hard_drive_type"
                      value="HDD"
                      checked={formData.laptop_hard_drive_type === "HDD"}
                      onChange={handleChange}
                    />
                    <label htmlFor="HDD">HDD</label>
                  </fieldset>

                  <div class="label-frame-comment">
                    <label
                      id="laptop_purchase_date_label"
                      class="label"
                      htmlFor="laptop_purchase_date"
                    >
                      შეძენის რიცხვი (არჩევითი)
                    </label>
                    <input
                      id="laptop_purchase_date"
                      class="mobile-frame"
                      type="text"
                      placeholder="დდ/თთ/წწწწ"
                      onChange={handleChange}
                      name="laptop_purchase_date"
                      value={formData.laptop_purchase_date}
                    />
                  </div>

                  <div class="label-frame-comment">
                    <label
                      id="laptop_price_label"
                      class="label"
                      htmlFor="laptop_price"
                    >
                      ლეპტოპის ფასი
                    </label>
                    <input
                      id="laptop_price"
                      class="mobile-frame"
                      type="text"
                      placeholder="0000"
                      onChange={handleChange}
                      name="laptop_price"
                      value={formData.laptop_price}
                    />
                    <p id="laptop_price_comment" class="comment">
                      მხოლოდ ციფრები
                    </p>
                  </div>

                  <fieldset class="fieldset">
                    <legend id="laptop-state">ლეპტოპის მდგომარეობა</legend>
                    <input
                      type="radio"
                      id="new"
                      name="laptop_state"
                      value="new"
                      checked={formData.laptop_state === "new"}
                      onChange={handleChange}
                    />
                    <label htmlFor="new">ახალი</label>

                    <input
                      type="radio"
                      id="used"
                      name="laptop_state"
                      value="used"
                      checked={formData.laptop_state === "used"}
                      onChange={handleChange}
                    />
                    <label htmlFor="used">მეორადი</label>
                    <br />
                  </fieldset>

                  <div class="buttons">
                    <button class="ukan" type="button" onClick={prevPage}>
                      უკან
                    </button>
                    <button class="submit">დამახსოვრება</button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
