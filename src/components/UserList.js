import useUserData from "../hooks/useUserData";
import axios from "axios";
export const UserList = () => {
  const {loading, userData, fetchUserData} = useUserData();

 
  // EDIT
  const handleEdit = async (user) => {
    const userName = prompt("Enter your new name");
    const userEmail = prompt("Enter Your new mail");

    if (!userName || !userEmail) {
      alert("Please Enter Name and Email Both");
    } else {
      const resp = await axios.put(`/editUser/${user._id}`, {
        name: userName,
        email: userEmail,
      });
      fetchUserData();
      console.log(resp);
    }
  };

  // DELETE
  const handleDelete = async (userId) => {
    const resp = await axios.delete(`/deleteUser/${userId}`);
    console.log(resp);
    fetchUserData();
  };
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-8">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            All Users
          </h1>
        </div>
        <div className="lg:w-2/3 w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Name
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Email
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Edit
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? <p className="mx-auto text-green mt-3 p-4">...Loading</p> : (
                userData && userData.length === 0 ? <p className="p-4">Nothing to preview list is empty</p>: (
                  userData && userData.map((user, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3">{user.name}</td>
                        <td className="px-4 py-3">{user.email}</td>
                        <td className="px-4 py-3">
                          <button
                            className="hover:text-green-500"
                            onClick={() => handleEdit(user)}
                          >
                            Edit
                          </button>
                        </td>
                        <td className="px-4 py-3 text-lg text-gray-900">
                          <button
                            className="hover:text-red-500"
                            onClick={() => handleDelete(user._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
