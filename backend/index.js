import express from "express"
import cors from "cors"
import { prisma } from "./src/db.js"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", async function(req, res) {
    try{
        const users = await prisma.user.findMany();
        res.json(users)
    } catch(error){
        console.log(error)
    }
    
})

app.get("/:id", async (req, res) => {
    const userId = req.params.id

    const user = await prisma.user.findFirst({
        where: {
            id: userId
        }
    })

    console.log(userId)
    res.json(user)

})

app.post("/cadatrar", async (req, res) => {
    const { nome, idade } = req.body

    if(!idade){
        res.json({mensagem: "A idade é obrigatorio"})
        return
    }

    const user = await prisma.user.create({
        data: {
            idade: idade,
            nome: nome
        }
    })

    res.json(user)

})

app.put("/:id", async (req, res) => {
    const{id} = req.params
    const {idade, nome} = req.body

    if(!idade){
        res.json({mensagem: "A idade é obrigatorio"})
        return
    }

    const user = await prisma.user.update({
        where: {id: id},
        data: { nome: nome, idade: idade }
    })

    res.json(user)
})

app.delete("/:id", async(req, res) => {
    const {id} = req.params

    const user = await prisma.user.delete({
        where: {id: id}
    })

    res.json({
        mensagem: "User excluido com sucesso",
        user
    })

})

const PORT = process.env.PORT || 3000; // Usa a porta do ambiente (Render), ou 3000 localmente

app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`)
})