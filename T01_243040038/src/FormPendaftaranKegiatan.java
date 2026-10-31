import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.border.TitledBorder;
import java.awt.*;

public class FormPendaftaranKegiatan extends JFrame {

    // Identitas
    private final JTextField txtNama = new JTextField(20);
    private final JTextField txtNpm = new JTextField(20);
    private final JTextField txtEmail = new JTextField(20);

    // Pilihan kegiatan
    private final JComboBox<String> cmbKegiatan = new JComboBox<>(new String[]{
            "Seminar Teknologi", "Workshop Java Swing", "Lomba Pemrograman", "Pelatihan Basis Data"});
    private final JRadioButton rbPagi = new JRadioButton("Sesi Pagi (08.00 - 11.00)", true);
    private final JRadioButton rbSiang = new JRadioButton("Sesi Siang (13.00 - 16.00)");
    private final ButtonGroup grpSesi = new ButtonGroup();
    private final JCheckBox cbSertifikat = new JCheckBox("Sertifikat");
    private final JCheckBox cbKonsumsi = new JCheckBox("Konsumsi");
    private final JCheckBox cbMateri = new JCheckBox("Materi digital");

    // Catatan
    private final JTextArea txtCatatan = new JTextArea(5, 20);

    private final JButton btnDaftar = new JButton("Daftar");
    private final JButton btnReset = new JButton("Reset");

    public FormPendaftaranKegiatan() {
        super("Formulir Pendaftaran Kegiatan");
        setDefaultCloseOperation(EXIT_ON_CLOSE);

        JPanel root = new JPanel(new BorderLayout(10, 10));   // BorderLayout
        root.setBorder(new EmptyBorder(12, 12, 12, 12));

        JLabel judul = new JLabel("Formulir Pendaftaran Kegiatan", SwingConstants.CENTER);
        judul.setFont(judul.getFont().deriveFont(Font.BOLD, 18f));
        root.add(judul, BorderLayout.NORTH);

        // Bagian tengah: identitas, pilihan kegiatan, catatan (urutan add = urutan fokus)
        JPanel tengah = new JPanel();
        tengah.setLayout(new BoxLayout(tengah, BoxLayout.Y_AXIS));
        tengah.add(buatPanelIdentitas());
        tengah.add(Box.createVerticalStrut(8));
        tengah.add(buatPanelKegiatan());
        tengah.add(Box.createVerticalStrut(8));
        tengah.add(buatPanelCatatan());
        root.add(tengah, BorderLayout.CENTER);

        root.add(buatPanelTombol(), BorderLayout.SOUTH);

        setContentPane(root);
        aturAksi();
        pack();
        setMinimumSize(new Dimension(460, getHeight()));
        setLocationRelativeTo(null);
        getRootPane().setDefaultButton(btnDaftar);
    }

    private JPanel buatPanelIdentitas() {
        JPanel p = new JPanel(new GridBagLayout());           // GridBagLayout
        p.setBorder(BorderFactory.createTitledBorder(
                BorderFactory.createEtchedBorder(), "Identitas", TitledBorder.LEFT, TitledBorder.TOP));

        GridBagConstraints c = new GridBagConstraints();
        c.insets = new Insets(4, 6, 4, 6);
        c.anchor = GridBagConstraints.WEST;

        String[] label = {"Nama Lengkap", "NPM", "Email"};
        JTextField[] input = {txtNama, txtNpm, txtEmail};
        for (int i = 0; i < label.length; i++) {
            c.gridx = 0; c.gridy = i; c.weightx = 0; c.fill = GridBagConstraints.NONE;
            JLabel l = new JLabel(label[i] + ":");
            l.setLabelFor(input[i]);
            p.add(l, c);
            c.gridx = 1; c.weightx = 1; c.fill = GridBagConstraints.HORIZONTAL;
            p.add(input[i], c);
        }
        return p;
    }

    private JPanel buatPanelKegiatan() {
        JPanel p = new JPanel(new GridBagLayout());
        p.setBorder(BorderFactory.createTitledBorder(
                BorderFactory.createEtchedBorder(), "Pilihan Kegiatan", TitledBorder.LEFT, TitledBorder.TOP));

        grpSesi.add(rbPagi);                                  // radio saling eksklusif
        grpSesi.add(rbSiang);

        JPanel panelSesi = new JPanel(new GridLayout(0, 1));  // GridLayout
        panelSesi.add(rbPagi);
        panelSesi.add(rbSiang);

        JPanel panelExtra = new JPanel(new GridLayout(0, 1));
        panelExtra.add(cbSertifikat);
        panelExtra.add(cbKonsumsi);
        panelExtra.add(cbMateri);

        GridBagConstraints c = new GridBagConstraints();
        c.insets = new Insets(4, 6, 4, 6);
        c.anchor = GridBagConstraints.NORTHWEST;

        JLabel lKegiatan = new JLabel("Kegiatan:");
        lKegiatan.setLabelFor(cmbKegiatan);
        c.gridx = 0; c.gridy = 0;
        p.add(lKegiatan, c);
        c.gridx = 1; c.weightx = 1; c.fill = GridBagConstraints.HORIZONTAL;
        p.add(cmbKegiatan, c);

        c.gridx = 0; c.gridy = 1; c.weightx = 0; c.fill = GridBagConstraints.NONE;
        p.add(new JLabel("Sesi:"), c);
        c.gridx = 1; c.weightx = 1; c.fill = GridBagConstraints.HORIZONTAL;
        p.add(panelSesi, c);

        c.gridx = 0; c.gridy = 2; c.weightx = 0; c.fill = GridBagConstraints.NONE;
        p.add(new JLabel("Kebutuhan:"), c);
        c.gridx = 1; c.weightx = 1; c.fill = GridBagConstraints.HORIZONTAL;
        p.add(panelExtra, c);
        return p;
    }

    private JPanel buatPanelCatatan() {
        JPanel p = new JPanel(new BorderLayout());
        p.setBorder(BorderFactory.createTitledBorder(
                BorderFactory.createEtchedBorder(), "Catatan", TitledBorder.LEFT, TitledBorder.TOP));
        txtCatatan.setLineWrap(true);
        txtCatatan.setWrapStyleWord(true);
        // Tab berpindah fokus ke komponen berikutnya (bukan menyisipkan karakter tab)
        txtCatatan.setFocusTraversalKeys(KeyboardFocusManager.FORWARD_TRAVERSAL_KEYS, null);
        txtCatatan.setFocusTraversalKeys(KeyboardFocusManager.BACKWARD_TRAVERSAL_KEYS, null);
        p.add(new JScrollPane(txtCatatan), BorderLayout.CENTER);
        return p;
    }

    private JPanel buatPanelTombol() {
        JPanel p = new JPanel(new FlowLayout(FlowLayout.RIGHT, 8, 4));   // FlowLayout
        p.add(btnDaftar);
        p.add(btnReset);
        return p;
    }

    private void aturAksi() {
        btnReset.addActionListener(e -> {
            txtNama.setText("");
            txtNpm.setText("");
            txtEmail.setText("");
            cmbKegiatan.setSelectedIndex(0);
            rbPagi.setSelected(true);
            cbSertifikat.setSelected(false);
            cbKonsumsi.setSelected(false);
            cbMateri.setSelected(false);
            txtCatatan.setText("");
            txtNama.requestFocusInWindow();
        });
        // Tugas ini belum wajib menyimpan data; tombol hanya menampilkan konfirmasi.
        btnDaftar.addActionListener(e -> JOptionPane.showMessageDialog(this,
                "Tombol Daftar ditekan (penyimpanan data belum diimplementasikan).",
                "Informasi", JOptionPane.INFORMATION_MESSAGE));
    }

    public static void main(String[] args) {
        // Aplikasi dibuka melalui Event Dispatch Thread
        SwingUtilities.invokeLater(() -> new FormPendaftaranKegiatan().setVisible(true));
    }
}
