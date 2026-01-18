
import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../config'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

  const [images, setImages] = useState([null, null, null, null])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory] = useState('Topwear')
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  console.log(bestseller,"BestSeller");

  const handleImageChange = (index, file) => {
    const updatedImages = [...images]
    updatedImages[index] = file
    setImages(updatedImages)
  }

  const toggleSize = (size) => {
    setSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    )
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!token) {
      console.error("❌ No token found. Please login again.")
      return
    }

    try {
      const formData = new FormData()

      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', Number(price))
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('bestSeller', bestseller)
      formData.append('sizes', JSON.stringify(sizes))

      images.forEach((img, index) => {
        if (img) {
          formData.append(`image${index + 1}`, img)
        }
      })

      console.log("✅ TOKEN SENT:", token)

      // const response = await axios.post(
      //   `${backendUrl}/api/product/add`,
      //   formData,
      //   {
      //     headers: {
      //       token,
      //       "Content-Type": "multipart/form-data"
      //     }
      //   }
      // )
      const response = await axios.post(
  `"https://forever-ecommerce-webbackend.vercel.app"/api/product/add`,
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,  // ✅ standard way
      "Content-Type": "multipart/form-data"
    }
  }
);


      if (response.data.success) {
        toast.success(response.data.message)
           setImages([null, null, null, null])
           setName('')
           setDescription('')
           setPrice('')
           setSizes([])
           setBestseller(false)
      } else {
        toast.error(response.data.message)
      }

      

    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-4'>

      <div>
        <p className='mb-2'>Upload Images</p>
        <div className='flex gap-2'>
          {images.map((img, index) => (
            <label key={index}>
              <img
                className='w-20 h-20 object-cover cursor-pointer'
                src={img ? URL.createObjectURL(img) : assets.upload_area}
                alt=""
              />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleImageChange(index, e.target.files[0])}
              />
            </label>
          ))}
        </div>
      </div>

      <div className='w-[500px]'>
        <p className='mb-2'>Product Name</p>
        <input
          className='w-full px-3 py-2 border'
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className='w-[500px]'>
        <p className='mb-2'>Product Description</p>
        <textarea
          className='w-full px-3 py-2 border'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className='flex gap-6'>
        <div>
          <p>Category</p>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className='px-3 py-2 border'>
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
          </select>
        </div>

        <div>
          <p>Sub Category</p>
          <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className='px-3 py-2 border'>
            <option>Topwear</option>
            <option>Bottomwear</option>
            <option>Winterwear</option>
          </select>
        </div>

        <div>
          <p>Price</p>
          <input
            className='px-3 py-2 border'
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <p className='mb-2'>Sizes</p>
        <div className='flex gap-2'>
          {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
            <p
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-3 py-1 cursor-pointer border ${sizes.includes(size) ? 'bg-pink-500 text-white' : 'bg-slate-200'}`}
            >
              {size}
            </p>
          ))}
        </div>
      </div>

      <div className='flex gap-2 items-center'>
        <input
          type="checkbox"
          checked={bestseller}
          onChange={() => setBestseller(true)}
        />
        <label>Add to Bestseller</label>
      </div>

      <button type='submit' className='w-28 py-3 bg-black text-white'>
        ADD
      </button>

    </form>
  )
}

export default Add



// import React, { useState } from 'react'
// import { assets } from '../assets/assets'
// import axios from 'axios'
// import { backendUrl } from '../config'

// const Add = ({token}) => {

//   const [images, setImages] = useState([null, null, null, null])

//   const [name, setName] = useState("")
//   const [description, setDescription] = useState("")
//   const [price, setPrice] = useState("")
//   const [category, setCategory] = useState("Men")
//   const [subCategory, setSubCategory] = useState("Topwear")
//   const [bestseller, setBestseller] = useState(false)
//   const [sizes, setSizes] = useState([])

//   // image handler
//   const handleImageChange = (index, file) => {
//     const updatedImages = [...images]
//     updatedImages[index] = file
//     setImages(updatedImages)
//   }

//   // size toggle
//   const toggleSize = (size) => {
//     setSizes(prev =>
//       prev.includes(size)
//         ? prev.filter(s => s !== size)
//         : [...prev, size]
//     )
//   }

//   // submit handler
//   const onSubmitHandler = (e) => {
//     e.preventDefault()

//     try {
//       const formData = new FormData()

//       formData.append("name", name)
//       formData.append("description", description)
//       formData.append("price", price)
//       formData.append("category", category)
//       formData.append("subCategory", subCategory)
//       formData.append("bestseller", bestseller)
//       formData.append("sizes", JSON.stringify(sizes))

//       image1 && formData.append("image1", image1)
//       image2 && formData.append("image2", image2)
//       image3 && formData.append("image3", image3)
//       image4 && formData.append("image4", image4)

//       const response = await axios.post(backendUrl + "/api/product/add" , formData, {headers:{token}})
//       console.log(response.data);
      
//     } catch (error) {
      
//     }

//   }

//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-4'>

//       {/* Upload Images */}
//       <div>
//         <p className='mb-2'>Upload Images</p>
//         <div className='flex gap-2'>
//           {images.map((img, index) => (
//             <label key={index}>
//               <img
//                 className='w-20 h-20 object-cover cursor-pointer'
//                 src={img ? URL.createObjectURL(img) : assets.upload_area}
//                 alt=""
//               />
//               <input
//                 type="file"
//                 hidden
//                 onChange={(e) => handleImageChange(index, e.target.files[0])}
//               />
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Product Name */}
//       <div className='w-[500px]'>
//         <p className='mb-2'>Product Name</p>
//         <input
//           className='w-full px-3 py-2 border'
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder='Type here'
//           required
//         />
//       </div>

//       {/* Description */}
//       <div className='w-[500px]'>
//         <p className='mb-2'>Product Description</p>
//         <textarea
//           className='w-full px-3 py-2 border'
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder='Description here'
//           required
//         />
//       </div>

//       {/* Category / Price */}
//       <div className='flex gap-6'>
//         <div>
//           <p>Category</p>
//           <select
//             className='px-3 py-2 border'
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option>Men</option>
//             <option>Women</option>
//             <option>Kids</option>
//           </select>
//         </div>

//         <div>
//           <p>Sub Category</p>
//           <select
//             className='px-3 py-2 border'
//             value={subCategory}
//             onChange={(e) => setSubCategory(e.target.value)}
//           >
//             <option>Topwear</option>
//             <option>Bottomwear</option>
//             <option>Winterwear</option>
//           </select>
//         </div>

//         <div>
//           <p>Price</p>
//           <input
//             className='px-3 py-2 border'
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             placeholder='25'
//             required
//           />
//         </div>
//       </div>

//       {/* Sizes */}
//       <div>
//         <p className='mb-2'>Sizes</p>
//         <div className='flex gap-2'>
//           {["S", "M", "L", "XL", "XXL"].map(size => (
//             <p
//               key={size}
//               onClick={() => toggleSize(size)}
//               className={`px-3 py-1 cursor-pointer border 
//               ${sizes.includes(size) ? "bg-pink-300 text-white" : "bg-slate-200"}`}
//             >
//               {size}
//             </p>
//           ))}
//         </div>
//       </div>

//       {/* Bestseller */}
//       <div className='flex gap-2 items-center'>
//         <input
//           type="checkbox"
//           checked={bestseller}
//           onChange={() => setBestseller(!bestseller)}
//         />
//         <label>Add to Bestseller</label>
//       </div>

//       {/* Submit */}
//       <button type='submit' className='w-28 py-3 bg-black text-white'>
//         ADD
//       </button>

//     </form>
//   )
// }

// export default Add
