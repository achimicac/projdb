/*ไม่ได้ใส่อะไรด้านหน้า = Public*/
/*_ = Protected*/
/* # = Private*/

class User{
      #db

      constructor(db){
            this.#db = db
      }

      async getUserInform(userID) {
            const sql = 'SELECT * FROM User WHERE id = ?';
            try {
                const userInform = await this.executeQuery(sql, [userID]);
                console.log(userInform[0]);
                return userInform[0];
            } catch (error) {
                console.log("Can't find this user");
                throw error;
            }
      }
        
      async executeQuery(sql, params) {
      return new Promise((resolve, reject) => {
            this.#db.query(sql, params, (err, results) => {
                  if (err) {
                  reject(err);
                  } else {
                  resolve(results);
                  }
            });
      });
      }
    

      async checkAccount(username, email) {
            const sql = 'SELECT * FROM User WHERE username = ? OR email = ?'
            const account = await this.executeQuery(sql, [username, email]);
            if (typeof account[0] !== 'undefined') {
                  if (account[0].username === username) {
                        return {status: "error", error: "This username has already been in use"}
                  } 
                  else if (account[0].email === email){
                        return {status: "error", error: "This email has already been in use"}
                  }
            } else {
                  return false
            }
      }

      async addUser(username, pw, fname, lname, email, phone, pfp){
            const sql = 'INSERT INTO User SET ?'
            const user_data = {username: username, pw: pw, fname: fname, lname: lname, email: email, phone: phone, pfp: pfp}
            await this.#db.query(sql, user_data)
      }

      async editUser(id, username, pw, fname, lname, email, phone){
            console.log(fname)
            const sql = 'UPDATE User SET username=?, pw=?, fname=?, lname=?, email=?, phone=?, pfp=? WHERE id=?'
            const user_data = [username, pw, fname, lname, email, phone, pfp, id]
            await this.#db.query(sql, user_data, (editUserErr, editStatus) => {
                  if (editUserErr) {
                        return {status: "error", error: "Edit Unsuccess"}
                  } else {
                        return {status: "success", success: "Edit Success"}
                  }
            })
      }
}
module.exports = User;