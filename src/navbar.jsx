export const Navbar = () => {
  return (
    <>
     <nav className="flex justify-between bg-slate-700 text-white py-3 w-full min-w-[400px]" >
      <div className="logo">
       <span className="font-blod text-xl mx-8"> Todo App</span>
      </div>
      <ul className="flex gap-8 mx-9">
        <li className="cursor-pointer hover:font-bold transition-all duration-50">Home</li>
        <li className="cursor-pointer hover:font-bold transition-all duration-50">Your task</li>
      </ul>
     </nav>
    </>
  );
};
