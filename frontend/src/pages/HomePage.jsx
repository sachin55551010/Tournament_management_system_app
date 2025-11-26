import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
export const HomePage = () => {
  const { chooseTheme } = useSelector((state) => state.theme);
  return (
    <div className={`pt-20 max-h-dvh overflow-y-auto px-2`}>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
        praesentium quis ipsum, illo molestias quae aliquid fugit et! Aliquam
        illum fugiat facere voluptate pariatur quisquam tenetur sequi vel odit
        sapiente molestias et sint, rerum laudantium quos aut reprehenderit a
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
        praesentium quis ipsum, illo molestias quae aliquid fugit et! Aliquam
        illum fugiat facere voluptate pariatur quisquam tenetur sequi vel odit
        sapiente molestias et sint, rerum laudantium quos aut reprehenderit a
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
        praesentium quis ipsum, illo molestias quae aliquid fugit et! Aliquam
        illum fugiat facere voluptate pariatur quisquam tenetur sequi vel odit
        sapiente molestias et sint, rerum laudantium quos aut reprehenderit a
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
        praesentium quis ipsum, illo molestias quae aliquid fugit et! Aliquam
        illum fugiat facere voluptate pariatur quisquam tenetur sequi vel odit
        sapiente molestias et sint, rerum laudantium quos aut reprehenderit a
        voluptatum in quam nobis tempore? Corrupti recusandae quidem repudiandae
        sunt, harum accusantium cum expedita veritatis, voluptatem sed nisi
        aliquid et repellendus molestiae amet iure magnam atque eveniet vel
        voluptas sit eius necessitatibus? Non, aperiam eaque quod vero quos
        atque facere sapiente! Hic accusamus laborum nostrum quae, perspiciatis
        maxime tempora laboriosam assumenda odio aspernatur obcaecati, animi
        facere vitae recusandae, doloribus iste ullam veniam perferendis! Esse,
        cum? Inventore nesciunt iste vitae, dignissimos sit totam voluptatem ut
        soluta porro minima ipsam repellendus hic culpa necessitatibus,
        aspernatur odio architecto quaerat nulla rem explicabo dolorem adipisci?
        Veniam aut, dolorum illum, minima corporis dicta eum ullam cupiditate
        quod eaque aliquid voluptates ea, expedita reiciendis eos ad. Doloremque
        eveniet recusandae repudiandae distinctio aut molestias fuga quasi vel
        veritatis fugit soluta nesciunt accusantium obcaecati molestiae nostrum
        aspernatur dolor corporis iste corrupti et, voluptatem ad asperiores?
        Possimus itaque exercitationem laudantium quo, corrupti sit nesciunt,
        deserunt totam, quisquam assumenda recusandae commodi ratione nulla
        beatae nostrum vel sint dolores. Facilis consectetur eveniet adipisci
        culpa. Animi, expedita numquam, voluptatem maxime a illum accusamus
        commodi cum perspiciatis maiores eum culpa sapiente corporis, in
        obcaecati optio doloribus enim dolorem quia repellendus voluptatum
        veniam consequatur impedit? Cupiditate illo iste, porro impedit et esse
        quisquam, quaerat facilis voluptatem ex distinctio provident repudiandae
        voluptatum dolorum eaque id voluptates hic commodi minus placeat aut.
        Voluptatem quaerat minima ad tempore voluptatibus quod facere officiis?
        Vel id quos aperiam. Vitae libero placeat voluptate aperiam blanditiis
        nulla, quam officia accusamus delectus, nemo expedita ullam neque natus.
        Eum natus labore deserunt officia quidem? Dolores obcaecati eligendi
        provident fugiat nihil exercitationem voluptate perspiciatis fugit.
      </p>
    </div>
  );
};
