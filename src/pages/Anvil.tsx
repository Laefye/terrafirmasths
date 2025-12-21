import { Button, Container, Dialog, DialogContent, DialogTitle, Divider, IconButton, List, ListItem, ListItemButton, Paper, Slider, Stack, TextField, Typography } from "@mui/material"
import StepSprite from "../components/StepSprite"
import Conditions from "../components/Conditions"
import { useEffect, useRef, useState } from "react"
import { getTrace } from "../logic/math"
import { createItem, deleteItem, loadItems, saveItem, type Item } from "../logic/storage"
import DeleteIcon from '@mui/icons-material/Delete';

const values = [
    [-3, -6, 2, 7],
    [-9, -15, 13, 16]
]


function DialogStorage({open, onClose}: {open: boolean, onClose: (item: Item | null) => void}) {
    const [items, setItems] = useState(() => loadItems());
    useEffect(() => {
        if (!open) return;
        setItems(loadItems());
    }, [open]);

    const del = (id: number) => {
        deleteItem(id);
        setItems(loadItems());
    }

    return (
        <Dialog open={open} onClose={() => onClose(null)} maxWidth="sm" fullWidth>
            <DialogTitle>Сохранённые расчёты</DialogTitle>
            <DialogContent>
                <List sx={{ pt: 0 }}>
                    {items.map((item) => (
                        <ListItem disablePadding key={item.id} secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={() => del(item.id)}>
                                <DeleteIcon />
                            </IconButton>
                        }>
                            <ListItemButton onClick={() => onClose(item)}>
                                {item.name} (Из: {item.fromPoints}, В: {item.toPoints}, условия: {item.conditions.join(', ')})
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    )
}

function DialogSaveItem({open, onClose, fromPoints, toPoints, conditions}: {open: boolean, onClose: () => void, fromPoints: number, toPoints: number, conditions: number[]}) {
    const name = useRef<HTMLInputElement>(null);
    
    const handleSubmit = (event: React.FormEvent) => {
        if (!name.current) return;
        event.preventDefault();
        const item = createItem(
            name.current.value,
            conditions,
            fromPoints,
            toPoints
        );
        saveItem(item);
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Сохранить расчёт</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} sx={{ marginTop: 1 }}>
                        <TextField required label="Название" fullWidth inputRef={name} />
                        <Button variant="contained" type="submit">Сохранить</Button>
                    </Stack>
                </form>
            </DialogContent>
        </Dialog>
    )
}



function Anvil() {
    const [conditions, setConditions] = useState<number[]>([]);
    const [fromPoints, setFromPoints] = useState<number>(0);
    const [toPoints, setToPoints] = useState<number>(140);
    const [storageOpen, setStorageOpen] = useState<boolean>(false);
    const [saveOpen, setSaveOpen] = useState<boolean>(false);

    const steps = getTrace(fromPoints, toPoints - conditions.reduce((a, b) => a + b, 0));

    const addCondition = (value: number) => {
        if (conditions.length < 3) {
            setConditions([...conditions, value]);
        } else {
            setConditions([...conditions.slice(1), value]);
        }
    }

    const closeFromStorage = (item: Item | null) => {
        setStorageOpen(false);
        if (!item) return;
        setFromPoints(item.fromPoints);
        setToPoints(item.toPoints);
        setConditions(item.conditions);
    }

    return (
        <Container
            maxWidth="lg"
            sx={{ marginTop: 4, marginBottom: 4, paddingBottom: 4, paddingTop: 4 }}
        >
            <DialogStorage open={storageOpen} onClose={closeFromStorage} />
            <DialogSaveItem 
                open={saveOpen}
                onClose={() => setSaveOpen(false)}
                fromPoints={fromPoints}
                toPoints={toPoints}
                conditions={conditions}
            />
            <Paper elevation={4} sx={{ padding: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Калькулятор ковки шагов
                </Typography>
                <Stack direction="row" spacing={4} flexShrink={0}>
                    <Stack alignItems={"center"}>
                        <Conditions conditions={conditions} />
                        {values.map((row, rowIndex) => (
                            <Stack key={rowIndex} direction="row">
                                {row.map((value, index) => (
                                    <Button key={index} variant="text" onClick={() => addCondition(value)} aria-label={`Add condition ${value}`} sx={{ padding: 1 }}>
                                        <StepSprite value={value} />
                                    </Button>
                                ))}
                            </Stack>)
                        )}
                    </Stack>
                    <Stack spacing={2} flexShrink={0}>
                        <Button color="error" variant="outlined" onClick={() => setConditions([])}>Стереть условия</Button>
                        <Slider 
                            aria-label="From Points"
                            min={0}
                            max={140}
                            valueLabelDisplay="auto"
                            value={[fromPoints, toPoints]}
                            onChange={(_, newValue) => {
                                const [from, to] = newValue as number[];
                                setFromPoints(from);
                                setToPoints(to);
                            }}
                        />
                        <TextField label="From Points" type="number" value={fromPoints} onChange={(e) => setFromPoints(Number(e.target.value))} />
                        <TextField label="To Points" type="number" value={toPoints} onChange={(e) => setToPoints(Number(e.target.value))} />
                        <Divider/>
                        <Button variant="outlined" onClick={() => setSaveOpen(true)}>Сохранить</Button>
                        <Button variant="outlined" onClick={() => setStorageOpen(true)}>Сохранённые расчёты</Button>
                    </Stack>
                    <Stack>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Шаги:
                        </Typography>
                        <Stack direction="row" flexWrap={"wrap"} width="100%">
                            {steps.map((value, index) => (
                                <StepSprite key={index} value={value} />
                            ))}
                            {conditions.map((value, index) => (
                                <StepSprite key={index} value={value} />
                            ))}
                        </Stack>
                    </Stack>
                </Stack>
            </Paper>
        </Container>
    )
}

export default Anvil
